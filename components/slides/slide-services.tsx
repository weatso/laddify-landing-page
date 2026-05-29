'use client';

import { motion } from 'framer-motion';
import { Megaphone, Target, Palette, Briefcase, Video, Package } from 'lucide-react';

const services = [
  {
    icon: <Megaphone className="w-6 h-6" />,
    color: 'from-[#FF3CAC] to-[#7B2FBE]',
    number: '01',
    title: 'Social Media Management & Content Production',
    features: ['Content Planning', 'Copywriting', 'Graphic Design', 'Scheduling & Publishing', 'Community Management', 'Monthly Analytics'],
  },
  {
    icon: <Target className="w-6 h-6" />,
    color: 'from-[#7B2FBE] to-[#2BD2FF]',
    number: '02',
    title: 'Performance Marketing & Ads Management',
    features: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Campaign Strategy', 'A/B Testing', 'ROAS Optimization'],
  },
  {
    icon: <Palette className="w-6 h-6" />,
    color: 'from-[#2BD2FF] to-[#FF3CAC]',
    number: '03',
    title: 'Visual Engineering & Brand Identity (2D/3D)',
    features: ['Logo Design', 'Brand Guidelines', 'UI/UX Design', '3D Asset Creation', 'Mascot Engineering', 'Visual System'],
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-[#FF3CAC] to-[#2BD2FF]',
    number: '04',
    title: 'Premium Corporate Collaterals',
    features: ['Company Profile', 'Investor Pitch Deck', 'Executive Presentations', 'Annual Reports', 'Interactive PDF', 'Print Collateral'],
  },
  {
    icon: <Video className="w-6 h-6" />,
    color: 'from-[#7B2FBE] to-[#FF3CAC]',
    number: '05',
    title: 'Motion Graphics & Short-Form Video',
    features: ['2D/3D Explainer', 'TikTok/Reels Content', 'Product Ads', 'Motion Branding', 'Video Editing', 'Storyboarding'],
  },
  {
    icon: <Package className="w-6 h-6" />,
    color: 'from-[#2BD2FF] to-[#7B2FBE]',
    number: '06',
    title: 'Packaging & Merchandise Design',
    features: ['Label Design', 'Mailer Box', 'Product Packaging', 'Corporate Merch', 'Sticker & Tag', 'Mockup Rendering'],
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

export default function SlideServices() {
  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] mb-2 sm:mb-3">
          The Laddify{' '}
          <span className="gradient-text">Growth Engine</span>
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base max-w-xl mx-auto">
          Six integrated service pillars engineered to scale your brand — not just manage it.
        </p>
      </motion.div>

      {/* Service Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            transition={{ duration: 0.4 }}
            className="glass-card-hover p-5 sm:p-6 flex flex-col group relative overflow-hidden"
          >
            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,60,172,0.06), rgba(43,210,255,0.06))',
              }}
            />

            {/* Header: Number + Icon */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>
                {service.icon}
              </div>
              <span className="text-2xl font-extrabold text-[#1A1A2E]/10 group-hover:text-[#1A1A2E]/20 transition-colors">
                {service.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-[#1A1A2E] mb-3 relative z-10 leading-snug">
              {service.title}
            </h3>

            {/* Service List */}
            <div className="mt-auto relative z-10 flex flex-wrap gap-1.5">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-[#1A1A2E]/5 text-[#1A1A2E]/70"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

