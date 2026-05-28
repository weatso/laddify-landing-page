# LADDIFY.ID — BRAND & TECHNICAL GUIDELINE
**Version:** 4.0 (Quentin Architecture + WebGL Aether Flow)
**Target:** Frontend Development & Brand Strategy

---

## 1. BRAND CORE & POSITIONING
Laddify diposisikan sebagai **End-to-End Growth Partner** (Partner Pertumbuhan Menyeluruh), bukan sekadar agensi atau vendor lepas[cite: 2].
*   **Tagline:** *Scale It. Laddify It.*[cite: 1, 2]
*   **Tone of Voice:** Confident (Ekspert, tidak minta izin), Direct (Langsung ke inti ROI), Ambitious, dan Professional namun tidak kaku (Relatable untuk B2B dan UMKM)[cite: 2].
*   **Brand Keywords:** End-to-End Solution, 360° Digital Growth, Scale Up, Dominate Market[cite: 2].

## 2. SPATIAL ARCHITECTURE (THE "QUENTIN" MODEL)
Situs tidak beroperasi dari atas ke bawah (*no-scroll document*). Situs beroperasi seperti aplikasi presentasi spasial tingkat tinggi.
*   **Latar Belakang (The Engine):** Kanvas WebGL (`aether-flow.tsx`) yang berjalan konstan di `z-index: -10` menghasilkan distorsi warna fluida lambat.
*   **Navigasi (The Deck):** Menggunakan `Framer Motion` (`AnimatePresence`). *Event Scroll* dari *mouse* atau *swipe* di HP ditangkap (di-*intercept*), lalu digunakan untuk mengubah *State* (misal: `activeSlide = 2`), yang akan memudarkan komponen lama dan memunculkan komponen baru di tengah layar.
*   **Kunci Layar:** `overflow-hidden` diaktifkan secara global. Pengguna tidak bisa menggulir halaman keluar dari kanvas.

## 3. COLOR SYSTEM
Diekstrak dari identitas logo Laddify untuk diinjeksi ke dalam CSS Tailwind dan parameter WebGL[cite: 2].

| Role | Color (Hex) | Usage |
| :--- | :--- | :--- |
| **Base / Fallback** | `#F0F0F7` | Light Lavender. Warna dasar kanvas dan fallback jika WebGL mati[cite: 2]. |
| **Accent 1** | `#FF3CAC` | Pink. Digunakan untuk pendaran kanvas dan ujung awal gradien[cite: 2]. |
| **Accent 2** | `#2BD2FF` | Cyan. Digunakan untuk pendaran kanvas dan ujung akhir gradien[cite: 2]. |
| **Surface** | `#FFFFFF` | White. Untuk dasar *container* dan *cards*[cite: 2]. |
| **Text Primary** | `#1A1A2E` | Dark. Kontras maksimal untuk teks di atas latar yang terang[cite: 2]. |
| **Text Muted** | `#6B7280` | Gray. Sub-teks, deksripsi, *captions*[cite: 2]. |
| **Secondary Accent**| `#7B2FBE` | Purple. Untuk *highlight* atau elemen pendukung jika diperlukan[cite: 2]. |

## 4. TYPOGRAPHY & VISUAL AESTHETICS
*   **Font:** Modern geometric sans-serif (Display: Bold/Extrabold, Body: Clean & Readable)[cite: 2].
*   **Teks Gradien:** Diterapkan HANYA pada kata kunci di *Headline* utama untuk memicu atensi[cite: 2].
*   **The Glassmorphism (Soft 3D/Neumorphic):** 
    Karena latar belakang adalah fluida WebGL, semua "Slide" dan "Card" B2B harus menggunakan efek kaca agar terlihat spasial[cite: 2].
```css
    .glass-card {
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
      border-radius: 1.5rem;
    }
    ```

## 5. CONTENT SLIDES (THE FUNNEL)
Setiap perubahan *state* akan merender satu *slide* ini di atas kanvas WebGL[cite: 2]. Konten di dalam *slide* harus sangat ringkas karena ruang statis terbatas.

*   **Slide 1: THE HOOK (Hero)**
    "Your Brand Deserves to Be Impossible to Ignore." + Slogan + 2 Tombol CTA[cite: 2].
*   **Slide 2: THE AGITATION (Problems)**
    Grid kaca menampilkan validasi: Engagement rendah, Followers stagnan, Iklan tidak efektif[cite: 2].
*   **Slide 3: THE MECHANISM (Services)**
    3 Kartu Kaca: SMM, Paid Advertising, Growth Strategy[cite: 2].
*   **Slide 4: THE FILTER (Packages)**
    Tabel harga modular (*Basic* dan *Premium*, dari Elite IDR 1.100.000 hingga Apex)[cite: 1, 2].
*   **Slide 5: THE EXPANSION (Brand Studio)**
    Upsell untuk Brand Identity, Company Profile, Creative Assets[cite: 2].
*   **Slide 6: THE AUTHORITY (Why Us)**
    Poin kekuatan (Speed, Security, Transparent) dan Testimoni Klien[cite: 2].
*   **Slide 7: THE CLOSE (Contact)**
    Formulir yang terhubung dengan auto-redirect WhatsApp (0818-0587-7845)[cite: 2].