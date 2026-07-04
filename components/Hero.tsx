"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 px-6 sm:px-8 lg:py-32">
      {/* 백그라운드 빛 효과 그라데이션 */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute top-1/3 left-1/3 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl text-center">
        {/* 배지 알림 */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 px-3 py-1 text-xs sm:text-sm font-medium text-violet-400 mb-8 animate-pulse">
          ✨ 코딩 초보 선생님들을 위한 시작점
        </div>

        {/* 환영 문구 (Hero Title) */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent leading-tight sm:leading-none">
          나만의 교육용 웹앱 만들기
        </h1>

        {/* 설명 (Hero Description) */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
          EduCraft Studio에 오신 것을 환영합니다! 이 템플릿은 학교 수업이나 학습 활동에서 
          바로 활용할 수 있는 나만의 교육 도구를 만들기 위한 가장 단순하고 직관적인 시작 프로그램입니다.
        </p>

        {/* CTA 버튼 영역 */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/graph"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-400 hover:to-violet-500 hover:shadow-indigo-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            📊 좌표평면 탐구 시작하기
          </Link>
        </div>

        {/* 선생님들을 위한 코딩 가이드 안내 카드 */}
        <div className="mt-16 text-left mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm sm:p-8">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            💡 초보 선생님을 위한 코딩 가이드
          </h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            이제 다음 파일들을 수정하며 나만의 웹앱을 커스텀해 보세요!
          </p>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="text-violet-400 font-bold">1.</span>
              <span>
                <strong>메인 화면 편집:</strong> <code className="rounded bg-slate-800 px-1.5 py-0.5 text-violet-300">components/Hero.tsx</code> 파일을 열어 이 안내 카드를 지우고 수업 자료나 퀴즈 공간으로 채우세요.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-400 font-bold">2.</span>
              <span>
                <strong>디자인 스타일 수정:</strong> <code className="rounded bg-slate-800 px-1.5 py-0.5 text-violet-300">app/globals.css</code> 파일에서 전체 테마 배경색과 어울리는 메인 컬러를 변경할 수 있습니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-400 font-bold">3.</span>
              <span>
                <strong>페이지 추가:</strong> <code className="rounded bg-slate-800 px-1.5 py-0.5 text-violet-300">app/</code> 폴더 내에 새로운 폴더를 만들고 <code className="rounded bg-slate-800 px-1.5 py-0.5 text-violet-300">page.tsx</code>를 추가해 여러 페이지로 확장해 보세요.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
