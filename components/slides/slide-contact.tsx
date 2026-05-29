'use client';

import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';

export default function SlideContact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const waNumber = '6281805877845';
    const text = encodeURIComponent(
      `Halo Laddify! 👋\n\nNama: ${formData.name}\nPerusahaan: ${formData.company}\nTelepon: ${formData.phone}\n\nPesan:\n${formData.message}`
    );
    
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-3">
          Let&apos;s Scale{' '}
          <span className="gradient-text">Your Brand</span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg max-w-md mx-auto">
          Fill in the form and we&apos;ll connect with you via WhatsApp to discuss your growth strategy.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="glass-card p-7 sm:p-8 w-full"
      >
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="contact-company" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              required
              placeholder="Your company or brand name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              placeholder="08xx-xxxx-xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={3}
              placeholder="Tell us about your goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full mt-6 py-4 text-base cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.472 2.528a.75.75 0 01.195.834l-5.5 14a.75.75 0 01-1.379.066L8.5 12.5 3.572 10.212a.75.75 0 01.066-1.38l14-5.5a.75.75 0 01.834.196zM5.796 9.602L9.5 11.06a.75.75 0 01.44.44l1.458 3.704 3.993-10.148L5.796 9.602z"/>
          </svg>
          Send via WhatsApp
        </button>

        {/* Direct WhatsApp link */}
        <p className="text-center text-xs text-[#6B7280] mt-4">
          Or chat directly:{' '}
          <a
            href="https://wa.me/6281805877845"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1A1A2E] hover:text-[#FF3CAC] transition-colors"
          >
            0818-0587-7845
          </a>
        </p>
      </motion.form>
    </div>
  );
}
