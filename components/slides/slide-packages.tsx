'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SlidePackagesProps {
  goToSlide: (index: number) => void;
}

const basicPackages = [
  {
    name: 'Elite',
    price: 'IDR 1.100.000,-',
    period: '/Month',
    features: [
      '5 Feeds Posts',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
    ],
    accent: 'from-[#FF3CAC] to-[#7B2FBE]',
  },
  {
    name: 'Core',
    price: 'IDR 1.540.000,-',
    period: '/Month',
    popular: true,
    features: [
      '13 Feeds Posts',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
    ],
    accent: 'from-[#7B2FBE] to-[#2BD2FF]',
  },
  {
    name: 'Prime',
    price: 'IDR 2.200.000,-',
    period: '/Month',
    features: [
      '22 Feeds Posts',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
    ],
    accent: 'from-[#2BD2FF] to-[#7B2FBE]',
  },
];

const premiumPackages = [
  {
    name: 'Elite',
    price: 'IDR 3.600.000,-',
    period: '/Month',
    features: [
      '5 Feeds Posts',
      '1 Video Reels',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
    ],
    accent: 'from-[#FF3CAC] to-[#7B2FBE]',
  },
  {
    name: 'Core',
    price: 'IDR 4.800.000,-',
    period: '/Month',
    popular: true,
    features: [
      '9 Feeds Posts',
      '3 Video Reels',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
    ],
    accent: 'from-[#7B2FBE] to-[#2BD2FF]',
  },
  {
    name: 'Prime',
    price: 'IDR 7.200.000,-',
    period: '/Month',
    features: [
      '13 Feeds Posts',
      '5 Video Reels with talent',
      'Story Hari Raya Greeting',
      'Copywriting + Caption & Hastag',
      'Posting',
      'Content Performance Reports',
    ],
    accent: 'from-[#2BD2FF] to-[#7B2FBE]',
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SlidePackages({ goToSlide }: SlidePackagesProps) {
  const [tier, setTier] = useState<'basic' | 'premium'>('basic');
  const packages = tier === 'basic' ? basicPackages : premiumPackages;

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] mb-3">
          Choose Your{' '}
          <span className="gradient-text">Growth Plan</span>
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base max-w-lg mx-auto mb-5">
          Transparent pricing. No hidden fees. Real results.
        </p>

        {/* Tier Toggle */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#1A1A2E]/5">
          <button
            onClick={() => setTier('basic')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              tier === 'basic'
                ? 'bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] text-white shadow-lg shadow-[#FF3CAC]/20'
                : 'text-[#1A1A2E]/60 hover:text-[#1A1A2E]'
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setTier('premium')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              tier === 'premium'
                ? 'bg-gradient-to-r from-[#7B2FBE] to-[#2BD2FF] text-white shadow-lg shadow-[#7B2FBE]/20'
                : 'text-[#1A1A2E]/60 hover:text-[#1A1A2E]'
            }`}
          >
            Premium
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        key={tier}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-4"
      >
        {packages.map((pkg) => (
          <motion.div
            key={`${tier}-${pkg.name}`}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className={`glass-card-hover p-5 sm:p-6 flex flex-col relative ${
              pkg.popular ? 'ring-2 ring-[#7B2FBE]/30' : ''
            }`}
          >
            {/* Popular badge */}
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#2BD2FF] text-white text-[10px] sm:text-xs font-bold shadow-lg whitespace-nowrap">
                BEST VALUE
              </div>
            )}

            {/* Package name */}
            <div className="mb-4">
              <h3 className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${pkg.accent} bg-clip-text text-transparent`}>
                {pkg.name}
              </h3>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
                {pkg.price}
              </span>
              <span className="text-xs text-[#6B7280] ml-1">{pkg.period}</span>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-5 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-[#1A1A2E]/80">
                  <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="url(#check-grad)" fillOpacity="0.15"/>
                    <path d="M5.5 8L7 9.5L10.5 6" stroke="url(#check-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs><linearGradient id="check-grad" x1="0" y1="0" x2="16" y2="16"><stop stopColor="#FF3CAC"/><stop offset="1" stopColor="#2BD2FF"/></linearGradient></defs>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => goToSlide(6)}
              className={`w-full py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                pkg.popular
                  ? 'bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] text-white hover:shadow-lg hover:shadow-[#FF3CAC]/25'
                  : 'bg-[#1A1A2E]/5 text-[#1A1A2E] hover:bg-[#1A1A2E]/10'
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Apex Custom Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full glass-card-hover p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
      >
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3CAC]/5 via-[#7B2FBE]/5 to-[#2BD2FF]/5 pointer-events-none" />

        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] bg-clip-text text-transparent mb-1">
            Apex — Custom Package
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-md">
            Full-scale growth tailored to your brand. Includes everything in Premium + Paid Ads Management, Dedicated Account Manager, and Priority Support 24/7.
          </p>
        </div>

        <button
          onClick={() => goToSlide(6)}
          className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] text-white text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#7B2FBE]/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          Contact Us
        </button>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-[10px] sm:text-xs text-[#6B7280]/60 text-center mt-3 italic max-w-lg">
        *Any additional editing or revisions beyond the agreed scope will be subject to extra charges, based on a new quotation.
      </p>
    </div>
  );
}
