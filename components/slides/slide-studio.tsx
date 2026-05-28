'use client';

import { motion } from 'framer-motion';

import { Palette, FileText, Sparkles } from 'lucide-react';

const studioServices = [
  {
    icon: <Palette className="w-10 h-10 text-[#7B2FBE]" />,
    title: 'Brand Identity',
    description: 'Complete logo system, color palette, typography guide, and comprehensive brand book.',
    items: ['Logo System', 'Color Palette', 'Typography', 'Brand Book'],
  },
  {
    icon: <FileText className="w-10 h-10 text-[#7B2FBE]" />,
    title: 'Company Profile',
    description: 'Premium presentation decks, annual reports, and investor-ready materials.',
    items: ['Pitch Deck', 'Annual Report', 'Corporate Deck', 'Investor Materials'],
  },
  {
    icon: <Sparkles className="w-10 h-10 text-[#7B2FBE]" />,
    title: 'Creative Assets',
    description: 'Key visuals, motion graphics, social media templates, and campaign creatives.',
    items: ['Key Visuals', 'Motion Graphics', 'Templates', 'Campaign Assets'],
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

export default function SlideStudio() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B2FBE]/10 text-[#7B2FBE] text-xs font-bold mb-4">
          <span>BRAND STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-3">
          Beyond Social —{' '}
          <span className="gradient-text-purple">Build Your Brand DNA</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-lg mx-auto">
          Elevate your brand presence with premium creative and strategic assets.
        </p>
      </motion.div>

      {/* Studio Service Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
      >
        {studioServices.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card-hover p-7 flex flex-col group relative overflow-hidden"
          >
            {/* Purple accent glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#7B2FBE]/5 blur-2xl group-hover:bg-[#7B2FBE]/10 transition-colors duration-500" />
            
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
              {service.icon}
            </span>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 relative z-10">
              {service.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-5 leading-relaxed relative z-10">
              {service.description}
            </p>
            <div className="mt-auto grid grid-cols-2 gap-1.5 relative z-10">
              {service.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#7B2FBE]/5 text-[#7B2FBE]/80 text-center"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
