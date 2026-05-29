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
    <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto w-full h-full gap-4 lg:gap-8 px-4 sm:px-6">
      
      {/* Kiri: Area Model 3D (2 Bagian) */}
      <div className="hidden md:block md:w-2/5 h-full pointer-events-none relative z-10">
        {/* Ruang kosong murni untuk 3D Model yang disuntikkan secara global */}
      </div>

      {/* Kanan: Judul & Form Kontak (3 Bagian) */}
      <div className="md:w-[65%] w-full flex flex-col items-center justify-center relative z-20">
        
        {/* Judul sekarang diletakkan persis di atas form (Tengah / Center) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A2E] mb-2 leading-tight">
            Let&apos;s Scale <span className="gradient-text">Your Brand</span>
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base max-w-sm mx-auto">
            Fill in the form to start engineering your digital growth strategy.
          </p>
        </motion.div>

        {/* Form Kontak */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="w-full glass-card p-5 sm:p-6 pointer-events-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold text-[#1A1A2E] mb-1.5 uppercase tracking-wide">
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
              <label htmlFor="contact-company" className="block text-xs font-bold text-[#1A1A2E] mb-1.5 uppercase tracking-wide">
                Company
              </label>
              <input
                id="contact-company"
                type="text"
                required
                placeholder="Your brand name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label htmlFor="contact-phone" className="block text-xs font-bold text-[#1A1A2E] mb-1.5 uppercase tracking-wide">
                Phone / WhatsApp
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
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="block text-xs font-bold text-[#1A1A2E] mb-1.5 uppercase tracking-wide">
                Goals / Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={2}
                placeholder="Tell us about your brand goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#1A1A2E]/10 text-[#1A1A2E] text-sm placeholder-[#6B7280]/50 outline-none focus:border-[#FF3CAC]/50 focus:ring-2 focus:ring-[#FF3CAC]/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] text-white text-sm font-bold shadow-lg shadow-[#7B2FBE]/25 hover:shadow-xl hover:shadow-[#FF3CAC]/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.472 2.528a.75.75 0 01.195.834l-5.5 14a.75.75 0 01-1.379.066L8.5 12.5 3.572 10.212a.75.75 0 01.066-1.38l14-5.5a.75.75 0 01.834.196zM5.796 9.602L9.5 11.06a.75.75 0 01.44.44l1.458 3.704 3.993-10.148L5.796 9.602z"/>
            </svg>
            Send via WhatsApp
          </button>

          {/* Direct WhatsApp link */}
          <p className="text-center text-[11px] sm:text-xs text-[#6B7280] mt-3">
            Or chat directly:{' '}
            <a
              href="https://wa.me/6281805877845"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1A1A2E] hover:text-[#FF3CAC] transition-colors"
            >
              0818-0587-7845
            </a>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
