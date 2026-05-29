'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SlidePackagesProps {
  goToSlide: (index: number) => void;
}

const CATEGORIES = ['SMM', 'Ads', 'Visual', 'Corporate', 'Motion', 'Packaging'];

const pricingData: Record<string, any> = {
  SMM: {
    hasTiers: true,
    basic: [
      {
        name: 'Elite',
        price: 'IDR 1.100.000,-',
        period: '/Month',
        features: ['5 Feeds Posts', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting'],
        accent: 'from-[#FF3CAC] to-[#7B2FBE]',
      },
      {
        name: 'Core',
        price: 'IDR 1.540.000,-',
        period: '/Month',
        popular: true,
        features: ['13 Feeds Posts', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting'],
        accent: 'from-[#7B2FBE] to-[#2BD2FF]',
      },
      {
        name: 'Prime',
        price: 'IDR 2.200.000,-',
        period: '/Month',
        features: ['22 Feeds Posts', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting'],
        accent: 'from-[#2BD2FF] to-[#7B2FBE]',
      },
    ],
    premium: [
      {
        name: 'Elite',
        price: 'IDR 3.600.000,-',
        period: '/Month',
        features: ['5 Feeds Posts', '1 Video Reels', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting'],
        accent: 'from-[#FF3CAC] to-[#7B2FBE]',
      },
      {
        name: 'Core',
        price: 'IDR 4.800.000,-',
        period: '/Month',
        popular: true,
        features: ['9 Feeds Posts', '3 Video Reels', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting'],
        accent: 'from-[#7B2FBE] to-[#2BD2FF]',
      },
      {
        name: 'Prime',
        price: 'IDR 7.200.000,-',
        period: '/Month',
        features: ['13 Feeds Posts', '5 Video Reels with talent', 'Story Hari Raya Greeting', 'Copywriting + Caption & Hastag', 'Posting', 'Performance Reports'],
        accent: 'from-[#2BD2FF] to-[#7B2FBE]',
      },
    ]
  },
  Ads: [
    {
      name: 'Starter',
      price: 'IDR 1.500.000,-',
      period: '/Month',
      features: ['1 Platform Choice', 'Ad Budget ≤ 3 Juta', 'Basic Campaign Setup', 'Monthly Report'],
      accent: 'from-[#FF3CAC] to-[#7B2FBE]',
    },
    {
      name: 'Growth',
      price: 'IDR 3.000.000,-',
      period: '/Month',
      popular: true,
      features: ['2 Platform Choices', 'Ad Budget ≤ 10 Juta', 'Advanced Targeting', 'A/B Testing Strategy', 'Bi-weekly Report'],
      accent: 'from-[#7B2FBE] to-[#2BD2FF]',
    },
    {
      name: 'Scale',
      price: 'IDR 5.500.000,-',
      period: '/Month',
      features: ['3 Platform Choices', 'Unlimited Budget', 'Full Funnel Optimization', 'Pixel/API Integration', 'Real-time Dashboard'],
      accent: 'from-[#2BD2FF] to-[#7B2FBE]',
    },
  ],
  Visual: [
    {
      name: 'Logo Only',
      price: 'IDR 2.500.000,-',
      period: '/Project',
      features: ['Logo Design Concepts', 'Primary & Secondary Logo', 'Brand Pattern/Elements', 'Up to 3 Revisions'],
      accent: 'from-[#FF3CAC] to-[#7B2FBE]',
    },
    {
      name: 'Brand Kit',
      price: 'IDR 5.000.000,-',
      period: '/Project',
      popular: true,
      features: ['Everything in Logo Only', 'Comprehensive Guidelines', 'Typography System', 'Color Palette Strategy', 'Stationery Design'],
      accent: 'from-[#7B2FBE] to-[#2BD2FF]',
    },
    {
      name: 'Full Identity',
      price: 'IDR 12.000.000,-',
      period: '/Project',
      features: ['Everything in Brand Kit', 'UI/UX Design Concept', 'Custom 3D Mascot', 'Visual System Integration', 'Priority Support'],
      accent: 'from-[#2BD2FF] to-[#7B2FBE]',
    },
  ],
  Corporate: [
    {
      name: 'Pitch Deck',
      price: 'IDR 2.000.000,-',
      period: '/Project',
      features: ['Investor Pitch Deck Design', 'Up to 15 Slides', 'Custom Infographics', 'Data Visualization', 'PDF & Editable Format'],
      accent: 'from-[#FF3CAC] to-[#7B2FBE]',
    },
    {
      name: 'Company Profile',
      price: 'IDR 3.500.000,-',
      period: '/Project',
      popular: true,
      features: ['Interactive Company Profile', 'Up to 20 Pages', 'Premium Copywriting Polish', 'Print-ready Assets', 'Web-optimized PDF'],
      accent: 'from-[#7B2FBE] to-[#2BD2FF]',
    },
    {
      name: 'Exec Bundle',
      price: 'IDR 7.000.000,-',
      period: '/Project',
      features: ['Company Profile (20 Pages)', 'Pitch Deck (15 Slides)', 'Executive Presentation', 'Custom Animations', 'Dedicated Account Mgr'],
      accent: 'from-[#2BD2FF] to-[#7B2FBE]',
    },
  ],
  Motion: [
    {
      name: 'Reels / TikTok',
      price: 'IDR 750.000,-',
      period: '/Video',
      features: ['15-60 Seconds Duration', 'Trend-aligned Editing', 'Color Grading', 'Sound Design', 'Native Subtitles'],
      accent: 'from-[#FF3CAC] to-[#7B2FBE]',
    },
    {
      name: 'Explainer 2D',
      price: 'IDR 3.500.000,-',
      period: '/Video',
      popular: true,
      features: ['60-90 Seconds Duration', 'Custom 2D Animation', 'Professional Voice Over', 'Scriptwriting Included', 'Background Music'],
      accent: 'from-[#7B2FBE] to-[#2BD2FF]',
    },
    {
      name: 'Explainer 3D',
      price: 'IDR 7.500.000,-',
      period: '/Video',
      features: ['60-90 Seconds Duration', 'Full 3D Rendering', 'Professional Voice Over', 'Scriptwriting Included', 'Complex Animations'],
      accent: 'from-[#2BD2FF] to-[#7B2FBE]',
    },
  ],
  Packaging: [
    {
      name: 'Single Label',
      price: 'IDR 1.000.000,-',
      period: '/Project',
      features: ['1 Product Label Design', 'Print-ready Source Files', '3D Mockup Presentation', '2 Revision Rounds'],
      accent: 'from-[#FF3CAC] to-[#7B2FBE]',
    },
    {
      name: 'Packaging Set',
      price: 'IDR 3.000.000,-',
      period: '/Project',
      popular: true,
      features: ['Product Label Design', 'Mailer Box Design', 'Thank You Card / Tag', 'Print-ready Files', '3D Mockups'],
      accent: 'from-[#7B2FBE] to-[#2BD2FF]',
    },
    {
      name: 'Premium Bundle',
      price: 'IDR 5.500.000,-',
      period: '/Project',
      features: ['Full Packaging Set', 'Corporate Merch Design', 'Premium 3D Renders', 'Unlimited Revisions', 'Production Consultation'],
      accent: 'from-[#2BD2FF] to-[#7B2FBE]',
    },
  ],
};

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

export default function SlidePackages({ goToSlide }: SlidePackagesProps) {
  const [activeCategory, setActiveCategory] = useState('SMM');
  const [smmTier, setSmmTier] = useState<'basic' | 'premium'>('basic');

  const currentData = pricingData[activeCategory];
  const packages = activeCategory === 'SMM' ? currentData[smmTier] : currentData;

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto w-full h-full pb-8 sm:pb-0 justify-center">
      
      {/* Header & Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-4 sm:mb-6 w-full"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A2E] mb-2">
          Transparent <span className="gradient-text">Pricing</span>
        </h2>
        
        {/* Scrollable Tabs */}
        <div className="w-full overflow-x-auto scrollbar-hide py-2 mt-4 px-4 sm:px-0">
          <div className="flex items-center sm:justify-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative z-20 pointer-events-auto px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1A1A2E] text-white shadow-lg'
                    : 'bg-[#1A1A2E]/5 text-[#1A1A2E]/60 hover:text-[#1A1A2E] hover:bg-[#1A1A2E]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SMM Specific Tier Toggle */}
        <AnimatePresence>
          {activeCategory === 'SMM' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, mt: 0 }}
              animate={{ opacity: 1, height: 'auto', mt: 12 }}
              exit={{ opacity: 0, height: 0, mt: 0 }}
              className="inline-flex items-center p-1 rounded-full bg-[#1A1A2E]/5 overflow-hidden"
            >
              <button
                onClick={() => setSmmTier('basic')}
                className={`relative z-20 pointer-events-auto px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  smmTier === 'basic'
                    ? 'bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] text-white shadow-lg'
                    : 'text-[#1A1A2E]/60 hover:text-[#1A1A2E]'
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setSmmTier('premium')}
                className={`relative z-20 pointer-events-auto px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  smmTier === 'premium'
                    ? 'bg-gradient-to-r from-[#7B2FBE] to-[#2BD2FF] text-white shadow-lg'
                    : 'text-[#1A1A2E]/60 hover:text-[#1A1A2E]'
                }`}
              >
                Premium
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pricing Cards Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${smmTier}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full mb-4 px-4 sm:px-0"
        >
          {packages.map((pkg: any) => (
            <motion.div
              key={pkg.name}
              variants={cardVariants}
              transition={{ duration: 0.4 }}
              className={`glass-card-hover p-4 sm:p-5 flex flex-col relative ${
                pkg.popular ? 'ring-2 ring-[#7B2FBE]/30' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#2BD2FF] text-white text-[10px] font-bold shadow-lg whitespace-nowrap">
                  BEST VALUE
                </div>
              )}

              <div className="mb-2">
                <h3 className={`text-base sm:text-lg font-bold bg-gradient-to-r ${pkg.accent} bg-clip-text text-transparent`}>
                  {pkg.name}
                </h3>
              </div>

              <div className="mb-3">
                <span className="text-lg sm:text-xl font-extrabold text-[#1A1A2E]">
                  {pkg.price}
                </span>
                <span className="text-[10px] sm:text-xs text-[#6B7280] ml-1">{pkg.period}</span>
              </div>

              <ul className="space-y-1.5 mb-4 flex-1">
                {pkg.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2 text-[11px] sm:text-xs text-[#1A1A2E]/80">
                    <svg className="w-3 h-3 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="url(#check-grad)" fillOpacity="0.15"/>
                      <path d="M5.5 8L7 9.5L10.5 6" stroke="url(#check-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs><linearGradient id="check-grad" x1="0" y1="0" x2="16" y2="16"><stop stopColor="#FF3CAC"/><stop offset="1" stopColor="#2BD2FF"/></linearGradient></defs>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => goToSlide(6)}
                className={`relative z-20 pointer-events-auto w-full py-2.5 rounded-full font-semibold text-xs transition-all duration-300 cursor-pointer ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] text-white hover:shadow-lg'
                    : 'bg-[#1A1A2E]/5 text-[#1A1A2E] hover:bg-[#1A1A2E]/10'
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Universal Apex / Custom Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full mx-4 sm:mx-0 glass-card-hover p-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden max-w-[calc(100%-2rem)] sm:max-w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3CAC]/5 via-[#7B2FBE]/5 to-[#2BD2FF]/5 pointer-events-none" />
        
        <div className="relative z-10 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-extrabold bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] bg-clip-text text-transparent mb-1">
            Enterprise / Custom Scope
          </h3>
          <p className="text-[10px] sm:text-xs text-[#6B7280] max-w-md leading-relaxed">
            Need a tailored solution combining multiple services? We build custom retainers with dedicated account managers for enterprise needs.
          </p>
        </div>

        <button
          onClick={() => goToSlide(6)}
          className="relative z-20 pointer-events-auto flex-shrink-0 px-6 py-2 rounded-full bg-[#1A1A2E] text-white text-[11px] sm:text-xs font-bold hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          Talk to Sales
        </button>
      </motion.div>
      
      {/* Disclaimer */}
      {activeCategory === 'Ads' && (
        <p className="text-[9px] sm:text-[10px] text-[#6B7280]/70 text-center mt-2 italic">
          *Prices do not include platform ad budget (Meta/Google/TikTok ad spend).
        </p>
      )}
    </div>
  );
}
