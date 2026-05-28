'use client';

import { motion } from 'framer-motion';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#grad1)" fillOpacity="0.15"/>
        <path d="M16 8C11.58 8 8 11.58 8 16s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 9.2c0 .44-.36.8-.8.8H12.8c-.44 0-.8-.36-.8-.8C12 17.54 14.24 16 16 16s4 1.54 4 3.2z" fill="url(#grad1)"/>
        <defs><linearGradient id="grad1" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#FF3CAC"/><stop offset="1" stopColor="#2BD2FF"/></linearGradient></defs>
      </svg>
    ),
    title: 'Social Media Management',
    description: 'Content strategy, visual design, scheduling, community management, and monthly analytics reporting.',
    features: ['Content Calendar', 'Visual Design', 'Community Management', 'Analytics Reports'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#grad2)" fillOpacity="0.15"/>
        <path d="M24 12l-4-4H12L8 12v8l4 4h8l4-4v-8zM16 20c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="url(#grad2)"/>
        <defs><linearGradient id="grad2" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#FF3CAC"/><stop offset="1" stopColor="#7B2FBE"/></linearGradient></defs>
      </svg>
    ),
    title: 'Paid Advertising',
    description: 'Data-driven campaigns across Meta, Google, and TikTok Ads with real-time optimization for maximum ROAS.',
    features: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'ROAS Optimization'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="url(#grad3)" fillOpacity="0.15"/>
        <path d="M10 22h4V10h-4v12zm6 0h4V14h-4v8zm6 0h4V8h-4v14z" fill="url(#grad3)"/>
        <defs><linearGradient id="grad3" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#7B2FBE"/><stop offset="1" stopColor="#2BD2FF"/></linearGradient></defs>
      </svg>
    ),
    title: 'Growth Strategy',
    description: 'Full-funnel consulting — from brand audit to scaling roadmap. We architect your digital dominance.',
    features: ['Brand Audit', 'Funnel Design', 'Scaling Roadmap', 'KPI Dashboard'],
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

export default function SlideServices() {
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
          The Laddify{' '}
          <span className="gradient-text">Growth Engine</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-lg mx-auto">
          Three integrated pillars that work together to scale your brand — not just manage it.
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="glass-card-hover p-7 flex flex-col group relative overflow-hidden"
          >
            {/* Gradient border glow on hover */}
            <div className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,60,172,0.08), rgba(43,210,255,0.08))',
              }}
            />
            
            <div className="mb-4 relative z-10">{service.icon}</div>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 relative z-10">
              {service.title}
            </h3>
            <p className="text-sm text-[#6B7280] mb-5 leading-relaxed relative z-10">
              {service.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 relative z-10">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#1A1A2E]/5 text-[#1A1A2E]/70"
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
