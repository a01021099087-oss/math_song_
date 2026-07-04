"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface Point {
  id?: number;
  x: number;
  y: number;
  label?: string;
  created_at?: string;
}

// 좌표계 설정
const CANVAS_SIZE = 500;
const GRID_COUNT = 10; // -10 ~ 10
const ORIGIN = CANVAS_SIZE / 2;
const STEP = CANVAS_SIZE / (GRID_COUNT * 2); // 픽셀당 단위 거리

function coordToCanvas(val: number): number {
  return ORIGIN + val * STEP;
}

export default function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [inputX, setInputX] = useState("");
  const [inputY, setInputY] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  // ───────────── 상태 메시지 자동 제거 ─────────────
  useEffect(() => {
    if (!statusMsg) return;
    const timer = setTimeout(() => setStatusMsg(null), 3000);
    return () => clearTimeout(timer);
  }, [statusMsg]);

  // ───────────── 초기 데이터 로드 ─────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/points");
        const data = await res.json();
        setPoints(data.points || []);
      } catch {
        setStatusMsg({ text: "데이터 로드 실패. Supabase 연결을 확인하세요.", type: "error" });
      } finally {
        setIsFetching(false);
      }
    }
    load();
  }, []);

  // ───────────── 캔버스 그리기 ─────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = `${CANVAS_SIZE}px`;
    canvas.style.height = `${CANVAS_SIZE}px`;
    ctx.scale(dpr, dpr);

    // 배경
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 격자선
    ctx.strokeStyle = "rgba(99,102,241,0.12)";
    ctx.lineWidth = 1;
    for (let i = -GRID_COUNT; i <= GRID_COUNT; i++) {
      const x = coordToCanvas(i);
      const y = coordToCanvas(i);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_SIZE, y); ctx.stroke();
    }

    // 축
    ctx.strokeStyle = "rgba(148,163,184,0.6)";
    ctx.lineWidth = 1.5;
    // x축
    ctx.beginPath(); ctx.moveTo(0, ORIGIN); ctx.lineTo(CANVAS_SIZE, ORIGIN); ctx.stroke();
    // y축
    ctx.beginPath(); ctx.moveTo(ORIGIN, 0); ctx.lineTo(ORIGIN, CANVAS_SIZE); ctx.stroke();

    // 화살표
    const ar = 8;
    ctx.fillStyle = "rgba(148,163,184,0.6)";
    // 오른쪽 →
    ctx.beginPath();
    ctx.moveTo(CANVAS_SIZE - ar, ORIGIN - ar / 2);
    ctx.lineTo(CANVAS_SIZE, ORIGIN);
    ctx.lineTo(CANVAS_SIZE - ar, ORIGIN + ar / 2);
    ctx.fill();
    // 위쪽 ↑
    ctx.beginPath();
    ctx.moveTo(ORIGIN - ar / 2, ar);
    ctx.lineTo(ORIGIN, 0);
    ctx.lineTo(ORIGIN + ar / 2, ar);
    ctx.fill();

    // 눈금 숫자
    ctx.fillStyle = "rgba(148,163,184,0.5)";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let i = -GRID_COUNT + 1; i <= GRID_COUNT - 1; i++) {
      if (i === 0) continue;
      // x축 숫자
      ctx.fillText(String(i), coordToCanvas(i), ORIGIN + 4);
      // y축 숫자
      ctx.textAlign = "right";
      ctx.fillText(String(-i), ORIGIN - 4, coordToCanvas(i));
      ctx.textAlign = "center";
    }

    // 원점
    ctx.fillStyle = "rgba(148,163,184,0.6)";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("O", ORIGIN - 4, ORIGIN + 4);

    // 축 레이블
    ctx.fillStyle = "rgba(148,163,184,0.8)";
    ctx.font = "bold 13px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("x", CANVAS_SIZE - 14, ORIGIN + 6);
    ctx.textAlign = "center";
    ctx.fillText("y", ORIGIN + 8, 4);

    // 점 그리기
    const colors = [
      "#818cf8", "#34d399", "#f472b6", "#fbbf24",
      "#60a5fa", "#a78bfa", "#fb923c", "#4ade80",
    ];
    points.forEach((pt, idx) => {
      const cx = coordToCanvas(pt.x);
      const cy = coordToCanvas(-pt.y); // y축 반전
      const color = colors[idx % colors.length];

      // 빛 발광 효과
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
      grd.addColorStop(0, color + "55");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();

      // 점
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 라벨
      const labelText = pt.label || `(${pt.x}, ${pt.y})`;
      ctx.fillStyle = color;
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "center";

      // 라벨 배경
      const tw = ctx.measureText(labelText).width + 8;
      const labelX = cx - tw / 2;
      const labelY = cy - 24;
      ctx.fillStyle = "rgba(15,23,42,0.85)";
      ctx.beginPath();
      ctx.roundRect(labelX, labelY, tw, 16, 4);
      ctx.fill();

      ctx.fillStyle = color;
      ctx.fillText(labelText, cx, labelY + 2);
    });
  }, [points]);

  useEffect(() => {
    draw();
  }, [draw]);

  // ───────────── 점 추가 ─────────────
  async function handleAddPoint(e: React.FormEvent) {
    e.preventDefault();
    const x = parseFloat(inputX);
    const y = parseFloat(inputY);

    if (isNaN(x) || isNaN(y)) {
      setStatusMsg({ text: "유효한 숫자를 입력해주세요.", type: "error" });
      return;
    }
    if (Math.abs(x) > GRID_COUNT || Math.abs(y) > GRID_COUNT) {
      setStatusMsg({ text: `좌표는 -${GRID_COUNT} ~ ${GRID_COUNT} 범위여야 합니다.`, type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x, y, label: inputLabel || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPoints((prev) => [...prev, data.point]);
      setInputX("");
      setInputY("");
      setInputLabel("");
      setStatusMsg({ text: `(${x}, ${y}) 저장 완료!`, type: "success" });
    } catch (err) {
      setStatusMsg({ text: (err as Error).message || "저장 실패", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  // ───────────── 점 삭제 ─────────────
  async function handleDeletePoint(id?: number) {
    if (!id) return;
    try {
      await fetch(`/api/points/${id}`, { method: "DELETE" });
      setPoints((prev) => prev.filter((p) => p.id !== id));
      setStatusMsg({ text: "점이 삭제되었습니다.", type: "info" });
    } catch {
      setStatusMsg({ text: "삭제 실패", type: "error" });
    }
  }

  // ───────────── 전체 초기화 ─────────────
  async function handleClearAll() {
    if (!confirm("모든 점을 삭제할까요?")) return;
    try {
      await fetch("/api/points", { method: "DELETE" });
      setPoints([]);
      setStatusMsg({ text: "모든 점이 삭제되었습니다.", type: "info" });
    } catch {
      setStatusMsg({ text: "초기화 실패", type: "error" });
    }
  }

  // ───────────── 캔버스 호버 ─────────────
  function handleCanvasMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const found = points.find((pt) => {
      const cx = coordToCanvas(pt.x);
      const cy = coordToCanvas(-pt.y);
      return Math.hypot(mx - cx, my - cy) < 12;
    });
    setHoveredPoint(found || null);
  }

  // ───────────── 렌더 ─────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-100 transition-colors text-sm">
              ← 홈
            </Link>
            <span className="text-slate-600">|</span>
            <span className="font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              📊 좌표평면 탐구
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {points.length}개의 점 저장됨
          </span>
        </div>
      </header>

      {/* 상태 메시지 */}
      {statusMsg && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-sm font-medium shadow-xl transition-all ${
            statusMsg.type === "success"
              ? "bg-emerald-500/90 text-white"
              : statusMsg.type === "error"
              ? "bg-red-500/90 text-white"
              : "bg-indigo-500/90 text-white"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

          {/* ── 좌표 입력 패널 ── */}
          <div className="w-full lg:w-80 flex flex-col gap-5 flex-shrink-0">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">+</span>
                순서쌍 입력
              </h2>
              <form onSubmit={handleAddPoint} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 mb-1 block">x 좌표</label>
                    <input
                      id="input-x"
                      type="number"
                      step="any"
                      value={inputX}
                      onChange={(e) => setInputX(e.target.value)}
                      placeholder="-10 ~ 10"
                      required
                      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 mb-1 block">y 좌표</label>
                    <input
                      id="input-y"
                      type="number"
                      step="any"
                      value={inputY}
                      onChange={(e) => setInputY(e.target.value)}
                      placeholder="-10 ~ 10"
                      required
                      className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">라벨 (선택)</label>
                  <input
                    id="input-label"
                    type="text"
                    value={inputLabel}
                    onChange={(e) => setInputLabel(e.target.value)}
                    placeholder="예: A, B, 점 P ..."
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <button
                  id="btn-add-point"
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-semibold text-white hover:from-indigo-400 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  {isLoading ? "저장 중..." : "📍 점 찍기 & 저장"}
                </button>
              </form>
            </div>

            {/* 점 목록 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 flex-grow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-300">저장된 점 목록</h3>
                {points.length > 0 && (
                  <button
                    id="btn-clear-all"
                    onClick={handleClearAll}
                    className="text-xs text-red-400/70 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    전체 삭제
                  </button>
                )}
              </div>

              {isFetching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : points.length === 0 ? (
                <p className="text-xs text-slate-600 text-center py-8">
                  아직 점이 없습니다.<br />순서쌍을 입력해 보세요!
                </p>
              ) : (
                <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {points.map((pt, idx) => {
                    const colors = ["#818cf8","#34d399","#f472b6","#fbbf24","#60a5fa","#a78bfa","#fb923c","#4ade80"];
                    const color = colors[idx % colors.length];
                    return (
                      <li
                        key={pt.id ?? idx}
                        className="flex items-center justify-between rounded-lg bg-slate-800/60 px-3 py-2 group hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                          />
                          <span className="text-sm text-slate-200 font-mono truncate">
                            {pt.label ? (
                              <><span className="text-slate-400">{pt.label}: </span>({pt.x}, {pt.y})</>
                            ) : (
                              `(${pt.x}, ${pt.y})`
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeletePoint(pt.id)}
                          className="text-slate-600 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100 ml-2 flex-shrink-0 cursor-pointer"
                          title="삭제"
                        >
                          ✕
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* ── 좌표 평면 캔버스 ── */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-2 shadow-2xl shadow-indigo-500/5"
              style={{ width: CANVAS_SIZE + 16, height: CANVAS_SIZE + 16 }}
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="rounded-xl cursor-crosshair"
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* 호버 툴팁 */}
              {hoveredPoint && (
                <div className="absolute top-4 right-4 rounded-lg bg-slate-800/95 border border-slate-700 px-3 py-2 text-xs font-mono text-slate-200 pointer-events-none shadow-lg">
                  {hoveredPoint.label && <div className="text-indigo-400 font-bold">{hoveredPoint.label}</div>}
                  <div>x = {hoveredPoint.x}</div>
                  <div>y = {hoveredPoint.y}</div>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-600">
              점 위에 마우스를 올리면 좌표가 표시됩니다
            </p>
          </div>

        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-600">
        좌표평면 탐구 · Supabase 연동 · EduCraft Studio
      </footer>
    </div>
  );
}
