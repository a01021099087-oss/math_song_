"use client";

import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 sm:px-8">
        {/* 서비스 로고 */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
            EduCraft
          </span>
          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-500/20">
            Studio
          </span>
        </div>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
            주요 기능
          </a>
          <a href="#about" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
            소개
          </a>
          <a href="#guide" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">
            사용법
          </a>
          <button className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-500 hover:shadow-indigo-500/35 transition-all cursor-pointer">
            시작하기
          </button>
        </nav>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center p-2 text-slate-400 hover:text-slate-100 focus:outline-none cursor-pointer"
          aria-label="메뉴 열기"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-6 py-4 space-y-3">
          <a
            href="#features"
            className="block text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors py-1"
            onClick={() => setIsOpen(false)}
          >
            주요 기능
          </a>
          <a
            href="#about"
            className="block text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors py-1"
            onClick={() => setIsOpen(false)}
          >
            소개
          </a>
          <a
            href="#guide"
            className="block text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors py-1"
            onClick={() => setIsOpen(false)}
          >
            사용법
          </a>
          <button className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-indigo-400 hover:to-violet-500 transition-all cursor-pointer">
            시작하기
          </button>
        </div>
      )}
    </header>
  );
}
