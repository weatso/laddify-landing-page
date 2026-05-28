'use client';

import { motion } from 'framer-motion';

import { TrendingDown, BarChart2, Banknote } from 'lucide-react';

const problems = [
  {
    icon: <TrendingDown className="w-10 h-10 text-[#FF3CAC]" />,
    title: 'Low Engagement',
    description: 'Your content gets views but zero action. Likes don\'t convert. Comments are dead.',
    stat: '< 1%',
    statLabel: 'engagement rate',
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-[#2BD2FF]" />,
    title: 'Stagnant Growth',
    description: 'Followers have plateaued for months. Your audience isn\'t expanding anymore.',
    stat: '0%',
    statLabel: 'monthly growth',
  },
  {
    icon: <Banknote className="w-10 h-10 text-[#7B2FBE]" />,
    title: 'Wasted Ad Spend',
    description: 'You\'re burning budget on ads with no visible ROI. Every rupiah counts, but none come back.',
    stat: '???',
    statLabel: 'return on ads',
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
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-3">
          Sound{' '}
          <span className="gradient-text">Familiar?</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-lg mx-auto">
          These are the silent killers of digital growth. If any of these hit home, you&apos;re not alone.
        </p>
      </motion.div>

      {/* Problem Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card-hover p-7 flex flex-col items-center text-center group"
          >
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {problem.icon}
            </span>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
              {problem.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
              {problem.description}
            </p>
            <div className="mt-auto pt-4 border-t border-[#1A1A2E]/5 w-full">
              <span className="text-2xl font-extrabold gradient-text">{problem.stat}</span>
              <p className="text-xs text-[#6B7280] mt-0.5">{problem.statLabel}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
