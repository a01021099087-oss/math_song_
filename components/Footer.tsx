import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/40 py-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-400">
            EduCraft Studio
          </span>
        </div>
        <p className="text-xs text-slate-500 text-center sm:text-left">
          &copy; {currentYear} EduCraft Studio. All rights reserved. 본 템플릿은 누구나 자유롭게 활용하고 수정할 수 있습니다.
        </p>
      </div>
    </footer>
  );
}
