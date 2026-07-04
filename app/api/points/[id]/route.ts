/**
 * app/api/points/[id]/route.ts
 * 개별 점 삭제 API Route
 */

import { NextRequest, NextResponse } from "next/server";
import { deletePoint } from "../../../../lib/supabase";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pointId = parseInt(id, 10);
    if (isNaN(pointId)) {
      return NextResponse.json({ error: "유효하지 않은 ID입니다." }, { status: 400 });
    }
    await deletePoint(pointId);
    return NextResponse.json({ message: "점이 삭제되었습니다." });
  } catch (error) {
    console.error("DELETE /api/points/[id] error:", error);
    return NextResponse.json(
      { error: "삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
