import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Home, Smartphone, Phone, Printer, Mail, MousePointerClick, MapPin } from 'lucide-react';
import VanillaTilt from 'vanilla-tilt';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize vanilla-tilt for 3D effect
    const cards = document.querySelectorAll('.glass-card') as any;
    if (cards.length > 0) {
      VanillaTilt.init(cards, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }

    // Scroll animation for glass-nav
    const handleScroll = () => {
      const nav = document.querySelector('.glass-nav');
      if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="h-screen flex justify-center items-center text-center relative pt-20" id="home">
        <div className="z-10 animate-[fade-up_1.2s_ease-out_forwards]">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-widest leading-tight">
            대방 <span className="gold-text">현</span> 부동산<br />
            <span className="block text-xl md:text-2xl font-light tracking-[12px] mt-4 text-[#aaaaaa] uppercase">
              Real Estate Agent
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-normal text-[#aaaaaa] tracking-[3px] mt-3 mb-12">
            현명한 선택, 책임 있는 중개
          </p>
          
          <div className="flex flex-col items-center gap-4 md:gap-5 mb-24 w-full px-4 text-center">
            <Link 
              to="/register" 
              className="inline-block w-full sm:w-auto px-6 py-4 sm:px-12 sm:py-5 md:px-16 md:py-6 bg-gradient-to-r from-[#d4af37] to-[#b8952b] text-[#111] rounded-full font-black transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:-translate-y-2 text-xl sm:text-2xl md:text-3xl tracking-widest break-keep"
            >
              간편 매물접수
            </Link>
            <span className="text-[#aaaaaa] text-xs sm:text-sm md:text-base font-light tracking-wide md:tracking-widest opacity-80 bg-black/40 px-3 sm:px-4 py-2 rounded-full border border-white/5 leading-snug break-keep max-w-full">
              👆 클릭시 간편 매물접수 화면으로 이동합니다 
            </span>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[#d4af37] text-sm tracking-widest opacity-70 animate-bounce-slow cursor-pointer hover:opacity-100 transition-opacity">
            <span onClick={() => document.getElementById('about')?.scrollIntoView()}>명함 보기</span>
            <ChevronDown size={24} />
          </div>
        </div>
      </header>

      {/* Business Card Section */}
      <section className="min-h-screen flex justify-center items-center py-20 px-4 sm:px-5 relative z-10" id="about">
        <div className="perspective-[1200px] w-full max-w-[650px]">
          <div className="glass-card w-full rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden transform-style-3d group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            
            <div className="transform translate-z-[40px] mb-8">
              <Home className="text-[#d4af37] w-14 h-14 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" />
            </div>
            
            <div className="transform translate-z-[60px]">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-[8px] drop-shadow-md">
                정 현
              </h2>
              <p className="text-lg md:text-xl text-[#d4af37] font-medium tracking-widest mb-6">
                대표 | 공인중개사
              </p>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(212,175,55,0.25)] to-transparent my-8"></div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-[rgba(255,255,255,0.8)]">
                <li className="col-span-1 md:col-span-2 flex items-center gap-4 text-2xl font-bold text-[#f3e5ab]">
                  <Smartphone className="text-[#d4af37]" size={24} /> 010-3111-9666
                </li>
                <li className="flex items-center gap-4 text-lg hover:text-white transition-colors">
                  <Phone className="text-[#d4af37]" size={20} /> 055-362-9666
                </li>
                <li className="flex items-center gap-4 text-lg hover:text-white transition-colors">
                  <Printer className="text-[#d4af37]" size={20} /> 050-4401-9666
                </li>
                <li className="flex items-center gap-4 text-lg hover:text-white transition-colors">
                  <Mail className="text-[#d4af37]" size={20} /> j.hyun2918@gmail.com
                </li>
                <li className="flex items-center gap-4 text-lg hover:text-white transition-colors">
                  <MousePointerClick className="text-[#d4af37]" size={20} /> 
                  <a href="https://daevang.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] hover:underline">
                    대방 현 부동산 알아보기
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="transform translate-z-[30px] mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <p className="text-[#aaaaaa] flex items-center gap-3 text-[15px] leading-relaxed">
                <MapPin className="text-[#d4af37] shrink-0" size={20} />
                경남 양산시 물금읍 야리로 50, 대방8차 상가동 103호
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
