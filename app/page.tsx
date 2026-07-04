import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* 네비게이션 헤더 */}
      <Header />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow flex flex-col justify-center">
        <Hero />
      </main>

      {/* 푸터 영역 */}
      <Footer />
    </div>
  );
}
