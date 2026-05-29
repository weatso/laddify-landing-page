'use client';

import { motion } from 'framer-motion';

import { Zap, ShieldCheck, Activity } from 'lucide-react';

const strengths = [
  {
    icon: <Zap className="w-6 h-6 text-[#1A1A2E]" />,
    title: 'Speed',
    description: 'Rapid execution. Your campaigns launch in days, not weeks.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#1A1A2E]" />,
    title: 'Security',
    description: 'Your brand data and assets are protected with enterprise-grade security.',
  },
  {
    icon: <Activity className="w-6 h-6 text-[#1A1A2E]" />,
    title: 'Transparent',
    description: 'Real-time dashboards. No black-box reporting. You see everything.',
  },
];

const testimonials = [
  {
    quote: "Laddify transformed our social media from static to stellar. Our engagement tripled in just 2 months.",
    name: 'Rina Susanto',
    role: 'CMO, TechVentura',
    avatar: 'RS',
  },
  {
    quote: "The ROI on our paid ads skyrocketed after partnering with Laddify. Finally, every rupiah counts.",
    name: 'Budi Hartono',
    role: 'Founder, KopiKu',
    avatar: 'BH',
  },
  {
    quote: "Their growth strategy gave us a clear roadmap. We doubled our leads in one quarter.",
    name: 'Maya Putri',
    role: 'Marketing Director, EduSphere',
    avatar: 'MP',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideAuthority() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-3">
          Why{' '}
          <span className="gradient-text">Laddify?</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-lg mx-auto">
          We don&apos;t just manage — we engineer growth.
        </p>
      </motion.div>

      {/* Strength Points */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8"
      >
        {strengths.map((strength) => (
          <motion.div
            key={strength.title}
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="glass-card p-5 flex flex-col items-center text-center"
          >
            <span className="text-2xl mb-2">{strength.icon}</span>
            <h3 className="text-sm font-bold text-[#1A1A2E] mb-1">{strength.title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">{strength.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="glass-card-hover p-6 flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.85.67-3.93L1.3 5.14l3.94-.57L7 1z" fill="#FBBF24"/>
                </svg>
              ))}
            </div>
            <p className="text-sm text-[#1A1A2E]/80 mb-4 leading-relaxed italic flex-1">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-[#1A1A2E]/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF3CAC] to-[#2BD2FF] flex items-center justify-center text-white text-xs font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">{testimonial.name}</p>
                <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
