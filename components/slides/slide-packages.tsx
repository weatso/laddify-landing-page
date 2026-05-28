'use client';

import { motion } from 'framer-motion';

interface SlidePackagesProps {
  goToSlide: (index: number) => void;
}

const packages = [
  {
    name: 'Elite',
    price: 'IDR 1.100.000',
    period: '/bulan',
    description: 'Ideal for small businesses starting their digital journey.',
    popular: false,
    features: [
      '8 Social Media Posts / month',
      'Content Calendar',
      'Basic Analytics Report',
      'Community Management',
      'Instagram & Facebook',
      'Monthly Strategy Call',
    ],
    accent: 'from-[#FF3CAC] to-[#7B2FBE]',
  },
  {
    name: 'Apex',
    price: 'Custom',
    period: 'tailored',
    description: 'Full-scale growth for brands ready to dominate their market.',
    popular: true,
    features: [
      'Unlimited Social Media Posts',
      'Paid Ads Management',
      'Full Analytics Dashboard',
      'Dedicated Account Manager',
      'All Platforms (Meta, Google, TikTok)',
      'Weekly Strategy Sessions',
      'Growth Consulting',
      'Priority Support 24/7',
    ],
    accent: 'from-[#2BD2FF] to-[#7B2FBE]',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SlidePackages({ goToSlide }: SlidePackagesProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-3">
          Choose Your{' '}
          <span className="gradient-text">Growth Plan</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-lg mx-auto">
          Transparent pricing. No hidden fees. Real results.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.name}
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className={`glass-card-hover p-7 flex flex-col relative ${
              pkg.popular ? 'ring-2 ring-[#7B2FBE]/30' : ''
            }`}
          >
            {/* Popular badge */}
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#2BD2FF] text-white text-xs font-bold shadow-lg">
                RECOMMENDED
              </div>
            )}

            {/* Package name */}
            <div className="mb-5">
              <h3 className={`text-xl font-bold bg-gradient-to-r ${pkg.accent} bg-clip-text text-transparent`}>
                {pkg.name}
              </h3>
              <p className="text-sm text-[#6B7280] mt-1">{pkg.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
                {pkg.price}
              </span>
              <span className="text-sm text-[#6B7280] ml-1">{pkg.period}</span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-7 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-[#1A1A2E]/80">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
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
              className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
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
    </div>
  );
}
