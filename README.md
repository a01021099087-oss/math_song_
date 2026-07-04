# 🏫 EduCraft Studio: 나만의 교육용 웹앱 만들기 🚀

선생님과 학생들을 위한 가장 단순하고 세련된 교육용 웹앱 기본 뼈대(Boilerplate) 프로젝트입니다. 이 템플릿은 브라우저에서 오류 없이 바로 렌더링되며, GitHub와 Vercel을 통해 단 몇 분 만에 즉시 배포할 수 있도록 구성되어 있습니다.

---

## 📂 프로젝트 폴더 구조

```text
math-song (root)
├── 📁 app/                     # Next.js App Router 페이지 및 레이아웃
│   ├── 📄 layout.tsx           # 전반적인 웹앱 레이아웃 (웹 폰트 및 공통 Meta 설정)
│   ├── 📄 page.tsx             # 메인 화면 홈 페이지 (Header, Hero, Footer 조립)
│   └── 📄 globals.css          # Tailwind CSS 스타일 및 테마 정의
├── 📁 components/              # 재사용 가능한 UI 컴포넌트
│   ├── 📄 Header.tsx           # 상단 로고 및 네비게이션 헤더 (반응형 모바일 메뉴 포함)
│   ├── 📄 Hero.tsx             # 메인 소개 화면 (환영 문구, 설명, 기능 테스트용 버튼)
│   └── 📄 Footer.tsx           # 하단 카피라이트 공간
├── 📁 public/                  # 이미지, 아이콘 등 정적 자원 폴더
├── 📄 tailwind.config.ts       # Tailwind CSS 설정 파일
├── 📄 tsconfig.json            # TypeScript 컴파일러 설정
├── 📄 package.json             # 프로젝트 정보 및 라이브러리 의존성
└── 📄 next.config.ts           # Next.js 설정 파일
```

---

## 🛠️ 선생님들을 위한 초간단 3단계 편집 가이드

코딩이 처음이신 선생님들도 쉽게 시작하실 수 있도록 준비했습니다! 다음 순서에 따라 자유롭게 기능을 더하고 수정해 보세요.

### 1단계: 메인 화면 글씨 수정하기
- [components/Hero.tsx](file:///c:/coding/components/Hero.tsx) 파일을 열어보세요.
- `나만의 교육용 웹앱 만들기` 부분이나 그 아래의 환영 메시지를 우리 반 학급 소개, 혹은 오늘 배울 내용으로 바꾸어 보세요.

### 2단계: 기능 추가 버튼 동작 변경하기
- [components/Hero.tsx](file:///c:/coding/components/Hero.tsx) 파일 상단의 `handlePlaceholderClick` 함수를 보세요.
- 버튼을 클릭했을 때 작동하는 알림 창(`alert`) 내용이나 기능을 선생님만의 기발한 아이디어(예: 랜덤 칭찬 메시지, 퀴즈 정답 검사 등)로 변경할 수 있습니다.

### 3단계: 나만의 테마 디자인 적용하기
- [app/globals.css](file:///c:/coding/app/globals.css) 파일에서 웹앱의 전체적인 분위기를 결정하는 배경색(`--background`)과 글자색(`--foreground`)을 변경할 수 있습니다.

---

## 🚀 로컬 실행 방법 (개발 서버 열기)

컴퓨터에 Node.js가 설치되어 있다면, 터미널에 아래 명령어를 입력하여 로컬 개발 서버를 열고 실시간으로 바뀌는 화면을 확인할 수 있습니다.

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 주소로 접속하면 로컬 화면이 열립니다.

---

## 🌐 Vercel에 즉시 배포하기

이 템플릿은 빌드 에러 없이 바로 Vercel에 연결될 수 있도록 최적화되어 있습니다.
1. 이 프로젝트 저장소를 GitHub에 푸시(Push)합니다.
2. [Vercel](https://vercel.com/) 로그인 후 **Add New Project**를 누릅니다.
3. 이 GitHub 저장소를 선택한 뒤 **Deploy**를 누르면 끝! 실시간 주소로 전 세계 학생들과 공유해 보세요.

