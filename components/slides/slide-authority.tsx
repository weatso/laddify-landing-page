'use client';

import { motion } from 'framer-motion';
import { Layers, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const strengths = [
  {
    icon: <Layers className="w-8 h-8 text-white" />,
    color: 'from-[#FF3CAC] to-[#7B2FBE]',
    title: 'An All-In-One Digital Powerhouse',
    description: 'Laddify delivers a complete spectrum of modern marketing such as social media, advertising, and growth tools. Seamlessly integrated into one elevated ecosystem.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    color: 'from-[#7B2FBE] to-[#2BD2FF]',
    title: 'Speed That Converts. Security You Don’t Question.',
    description: 'Built on precision systems that prioritize speed, security, and performance. So you get results without second-guessing quality.',
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-white" />,
    color: 'from-[#2BD2FF] to-[#FF3CAC]',
    title: 'Elite Support, 24/7',
    description: 'Our team is always within reach; offering strategic guidance, sharp insights, and hands-on support to help you extract maximum value whenever you need it.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideAuthority() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full h-full min-h-[70vh]">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4 uppercase tracking-tight">
          Why Laddify is the<br />
          <span className="gradient-text">Only Real Option?</span>
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-lg max-w-xl mx-auto">
          We don&apos;t just manage — we engineer growth with an unmatched ecosystem.
        </p>
      </motion.div>

      {/* Strength Points Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full px-4 sm:px-0"
      >
        {strengths.map((strength) => (
          <motion.div
            key={strength.title}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card-hover p-6 sm:p-8 flex flex-col group relative overflow-hidden"
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(255,60,172,0.05), rgba(43,210,255,0.05))`
              }}
            />

            {/* Icon Block */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${strength.color} flex items-center justify-center mb-6 shadow-lg shadow-[#1A1A2E]/5 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
              {strength.icon}
            </div>

            {/* Content */}
            <h3 className="text-base sm:text-lg font-extrabold text-[#1A1A2E] mb-3 relative z-10 leading-snug">
              {strength.title}
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed relative z-10 flex-1">
              {strength.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
