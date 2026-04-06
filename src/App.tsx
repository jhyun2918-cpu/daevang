import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      {/* Background Animation */}
      <div className="bg-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="glass-nav fixed top-0 w-full px-6 md:px-16 py-4 md:py-6 flex justify-between items-center z-[100] transition-all duration-400">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-widest text-white">
          대방 <span className="text-[#d4af37]">현</span> 부동산
        </Link>
        <div className="flex gap-4 items-center">
          <a href="https://daevang.vercel.app/" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[rgba(212,175,55,0.1)] to-[rgba(212,175,55,0.05)] border border-[#d4af37] text-[#d4af37] rounded-full font-semibold transition-all duration-300 backdrop-blur-sm text-base hover:bg-[#d4af37] hover:text-[#050505] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-1">
            알아보기
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Footer */}
      <footer className="glass-footer text-center py-10 px-5 mt-auto bg-[rgba(5,5,5,0.7)] backdrop-blur-md border-t border-[rgba(212,175,55,0.1)] relative z-10">
        <div className="text-xl font-bold mb-3 tracking-[3px] text-white">
          대방 <span className="text-[#d4af37]">현</span> 부동산
        </div>
        <p className="text-[#aaaaaa] text-sm">
          &copy; 2025 대방 현 부동산. All rights reserved.
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
