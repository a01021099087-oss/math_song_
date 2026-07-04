/**
 * app/api/points/route.ts
 * 좌표 데이터 CRUD API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchPoints, insertPoint, clearAllPoints } from "../../../lib/supabase";

/** 모든 점 조회 */
export async function GET() {
  try {
    const points = await fetchPoints();
    return NextResponse.json({ points });
  } catch (error) {
    console.error("GET /api/points error:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 새 점 저장 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { x, y, label } = body;

    if (typeof x !== "number" || typeof y !== "number") {
      return NextResponse.json(
        { error: "x, y 값은 숫자여야 합니다." },
        { status: 400 }
      );
    }

    const point = await insertPoint({ x, y, label: label || null });
    return NextResponse.json({ point }, { status: 201 });
  } catch (error) {
    console.error("POST /api/points error:", error);
    return NextResponse.json(
      { error: "데이터 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/** 모든 점 삭제 */
export async function DELETE() {
  try {
    await clearAllPoints();
    return NextResponse.json({ message: "모든 점이 삭제되었습니다." });
  } catch (error) {
    console.error("DELETE /api/points error:", error);
    return NextResponse.json(
      { error: "데이터 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
