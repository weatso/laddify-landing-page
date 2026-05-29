'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const AetherFlow = dynamic(() => import('@/components/aether-flow'), {
  ssr: false,
});

const ChibiPooCryScene = dynamic(() => import('@/components/chibi-poo-cry-scene'), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fafafa]">
      {/* Background Flow */}
      <AetherFlow />

      {/* Main Content — Responsive Split Layout */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        
        {/* Left/Top: 3D Crying Model */}
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-full relative">
          <ChibiPooCryScene />
        </div>

        {/* Right/Bottom: Text & Button */}
        <div className="w-full lg:w-1/2 h-[55vh] lg:h-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16">
          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-8xl sm:text-9xl lg:text-[10rem] font-extrabold text-[#1A1A2E] tracking-tighter mb-2 lg:mb-4 leading-none">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] bg-clip-text text-transparent mb-4 lg:mb-6">
              Oops! Are you lost?
            </h2>
            <p className="text-[#6B7280] mb-8 lg:mb-10 text-sm sm:text-base leading-relaxed">
              The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable. 
              Don&apos;t make our ChibiPoo cry anymore!
            </p>
            
            <Link 
              href="/"
              className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#7B2FBE]/30 transition-all duration-300"
            >
              Bring Me Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
