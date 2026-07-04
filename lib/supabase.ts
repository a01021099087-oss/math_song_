/**
 * lib/supabase.ts
 * Supabase REST API를 fetch로 직접 호출하는 유틸리티
 * (@supabase/supabase-js 패키지 없이 동작합니다)
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface Point {
  id?: number;
  x: number;
  y: number;
  label?: string;
  created_at?: string;
}

/** 공통 헤더 */
function getHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    Prefer: "return=representation",
  };
}

/** 모든 점 조회 */
export async function fetchPoints(): Promise<Point[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/coordinate_points?select=*&order=created_at.asc`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`Supabase fetch error: ${res.status}`);
  return res.json();
}

/** 새 점 저장 */
export async function insertPoint(point: Omit<Point, "id" | "created_at">): Promise<Point> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/coordinate_points`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(point),
  });
  if (!res.ok) throw new Error(`Supabase insert error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

/** 점 삭제 */
export async function deletePoint(id: number): Promise<void> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/coordinate_points?id=eq.${id}`,
    { method: "DELETE", headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`Supabase delete error: ${res.status}`);
}

/** 모든 점 삭제 */
export async function clearAllPoints(): Promise<void> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/coordinate_points?id=neq.0`,
    { method: "DELETE", headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`Supabase clear error: ${res.status}`);
}
