'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, CopyX, TrendingDown } from 'lucide-react';

const problems = [
  {
    icon: <ShieldAlert className="w-8 h-8 text-white" />,
    color: 'from-[#FF3CAC] to-[#7B2FBE]',
    title: 'The Trust Barrier',
    subtitle: 'Krisis Kredibilitas',
    description: 'Produk atau layanan Anda berstandar tinggi, tetapi identitas visual, website, dan pitch deck Anda terlihat seperti template gratisan. Akibatnya, calon klien ragu untuk menyetujui harga premium Anda.',
  },
  {
    icon: <CopyX className="w-8 h-8 text-white" />,
    color: 'from-[#7B2FBE] to-[#2BD2FF]',
    title: 'The Sea of Sameness',
    subtitle: 'Tenggelam dalam Kebisingan',
    description: 'Kampanye pemasaran Anda gagal menarik perhatian karena visualnya statis, kaku, dan sama persis dengan ribuan kompetitor. Anda membutuhkan interaksi dan dimensi baru.',
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-white" />,
    color: 'from-[#2BD2FF] to-[#FF3CAC]',
    title: 'The Conversion Leak',
    subtitle: 'Kebocoran Anggaran Iklan',
    description: 'Anda sudah membakar uang untuk mendatangkan trafik, tetapi pengunjung langsung pergi (bounce) karena antarmuka promosi Anda tidak memiliki hook visual yang meyakinkan untuk memandu mereka membeli.',
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

export default function SlideProblems() {
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto w-full h-full min-h-[70vh]">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] mb-3 sm:mb-4">
          Sound{' '}
          <span className="gradient-text">Familiar?</span>
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base max-w-xl mx-auto">
          These are the silent killers of digital growth. If any of these hit home, you&apos;re not alone.
        </p>
      </motion.div>

      {/* Problem Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full px-4 sm:px-0"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card-hover p-6 sm:p-8 flex flex-col items-center sm:items-start text-center sm:text-left group relative overflow-hidden"
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(255,60,172,0.05), rgba(43,210,255,0.05))`
              }}
            />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-6 shadow-lg shadow-[#1A1A2E]/5 group-hover:scale-110 transition-transform duration-500 relative z-10 flex-shrink-0`}>
              {problem.icon}
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1A2E] mb-1">
                {problem.title}
              </h3>
              <p className="text-xs font-bold text-[#7B2FBE] tracking-wider uppercase mb-4">
                ({problem.subtitle})
              </p>
              <p className="text-sm text-[#6B7280] leading-relaxed flex-1">
                {problem.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
