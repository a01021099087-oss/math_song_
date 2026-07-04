-- ============================================================
-- Supabase SQL Editor에 이 쿼리를 붙여넣어 실행하세요.
-- 경로: https://app.supabase.com → 프로젝트 선택 → SQL Editor → New query
-- ============================================================

-- 1. coordinate_points 테이블 생성
CREATE TABLE IF NOT EXISTS public.coordinate_points (
  id         BIGSERIAL PRIMARY KEY,
  x          NUMERIC        NOT NULL,
  y          NUMERIC        NOT NULL,
  label      TEXT,
  created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- 2. 테이블 설명 추가
COMMENT ON TABLE  public.coordinate_points        IS '좌표평면 탐구 프로그램에서 저장된 순서쌍 데이터';
COMMENT ON COLUMN public.coordinate_points.x      IS 'x 좌표 값';
COMMENT ON COLUMN public.coordinate_points.y      IS 'y 좌표 값';
COMMENT ON COLUMN public.coordinate_points.label  IS '점의 이름 (선택, 예: A, B, 점 P)';

-- 3. Row Level Security 활성화
ALTER TABLE public.coordinate_points ENABLE ROW LEVEL SECURITY;

-- 4. RLS 정책: 누구나 읽기 가능 (anon 포함)
CREATE POLICY "Anyone can read points"
  ON public.coordinate_points
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. RLS 정책: 누구나 쓰기 가능 (교육용 오픈 접근)
CREATE POLICY "Anyone can insert points"
  ON public.coordinate_points
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 6. RLS 정책: 누구나 삭제 가능
CREATE POLICY "Anyone can delete points"
  ON public.coordinate_points
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- 7. 인덱스: 최신순 조회 최적화
CREATE INDEX IF NOT EXISTS idx_coordinate_points_created_at
  ON public.coordinate_points (created_at ASC);

-- 8. 확인 쿼리 (선택)
-- SELECT * FROM public.coordinate_points ORDER BY created_at DESC LIMIT 10;
