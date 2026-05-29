'use client';

import { motion } from 'framer-motion';
import { Store, MessageSquareOff, Users, Banknote, MegaphoneOff } from 'lucide-react';

const problems = [
  {
    icon: <Store className="w-8 h-8 text-[#FF3CAC]" />,
    title: 'Low Traffic',
    description: 'Challenges in attracting customers to your online store.',
  },
  {
    icon: <MessageSquareOff className="w-8 h-8 text-[#7B2FBE]" />,
    title: 'Underperforming Content',
    description: 'Low engagement leading to underperforming content.',
  },
  {
    icon: <Users className="w-8 h-8 text-[#2BD2FF]" />,
    title: 'Limited Reach',
    description: 'Limited followers affecting your brand’s appeal.',
  },
  {
    icon: <Banknote className="w-8 h-8 text-[#FF3CAC]" />,
    title: 'Struggling to Monetize',
    description: 'Difficulty monetizing without a strong audience base.',
  },
  {
    icon: <MegaphoneOff className="w-8 h-8 text-[#7B2FBE]" />,
    title: 'Ineffective Campaigns',
    description: 'Campaigns not reaching their full potential due to low interaction.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideProblems() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] mb-2 sm:mb-3">
          Sound{' '}
          <span className="gradient-text">Familiar?</span>
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base max-w-lg mx-auto">
          These are the silent killers of digital growth. If any of these hit home, you&apos;re not alone.
        </p>
      </motion.div>

      {/* Problem Cards Grid - Responsive layout for 5 items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full"
      >
        {problems.map((problem) => (
          <motion.div
            key={problem.title}
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="glass-card-hover p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 group w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="flex-shrink-0 p-3 rounded-2xl bg-white/50 group-hover:scale-110 transition-transform duration-300">
              {problem.icon}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1A1A2E] mb-1">
                {problem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {problem.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
