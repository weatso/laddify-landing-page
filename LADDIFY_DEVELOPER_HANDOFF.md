# LADDIFY.ID — DEVELOPER HANDOFF & LANDING PAGE BRIEF
**Version:** 2.0 (Quentin Architecture / WebGL Edition)
**Target:** Frontend Development Team (Next.js)

---

## 1. PROJECT OVERVIEW
**Client:** Laddify.id
**Type:** 1-Page Spatial Landing Page (State-Driven Navigation)
**Primary Goal:** Generate qualified leads via contact form → redirect WhatsApp API.
**Positioning:** End-to-End Growth Partner, bukan sekadar vendor SMM.
**Tagline:** *Scale It. Laddify It.*

---

## 2. CORE ARCHITECTURE (THE "QUENTIN" MODEL)
Situs ini **TIDAK** menggunakan *scrolling* HTML tradisional dari atas ke bawah.
1.  **State-Driven Slides:** Halaman dirender sebagai "Slides" (presentasi). Event scroll dari *mousewheel* atau *touch swipe* ditangkap (intercepted) untuk mengubah status (misal: `slideIndex + 1`), memicu animasi transisi konten (fade in/out). Layar dikunci dengan `overflow-hidden`.
2.  **Background Engine:** Menggunakan `@react-three/fiber` dan `three` untuk merender komponen WebGL `aether-flow.tsx` yang berada di `z-index: -10`.
3.  **UI Layer:** Dibangun dengan Tailwind CSS dan dianimasikan menggunakan `Framer Motion` (`AnimatePresence`).
4.  **Framework:** Next.js (App Router, TypeScript).

---

## 3. COLOR SYSTEM & STYLING
Palet ini wajib dipetakan di `globals.css`.

*   **Base Background:** `#F0F0F7` (Light Lavender - Fallback jika WebGL mati)
*   **Primary Gradient:** `#FF3CAC` (Pink) to `#2BD2FF` (Cyan)
*   **Text Primary:** `#1A1A2E` (Dark Navy)
*   **Text Muted:** `#6B7280` (Cool Gray)

### The Glassmorphism Base
Karena latar belakang menggunakan animasi WebGL, SEMUA *cards*, *bento box*, dan *container* utama harus menggunakan utilitas `.glass-card` agar UI terlihat melayang di ruang 3D.

```css
@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
    border-radius: 1.5rem;
  }
}