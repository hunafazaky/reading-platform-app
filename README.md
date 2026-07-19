# PaMacha

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Connectify** adalah platform media sosial modern, minimalis, dan responsif yang dirancang khusus untuk memfasilitasi tulisan panjang (seperti cerita pendek, blog, dan esai) sekaligus interaksi sosial antar pengguna. Aplikasi ini dibangun menggunakan Next.js (App Router) untuk menjamin performa tinggi, optimasi SEO, dan pengalaman pengguna yang mulus.

[Lihat Live Demo](https://connectify-demo.vercel.app) | [Fitur Utama](#-fitur-utama) | [Panduan Instalasi](#-memulai-instalasi)

---

## Fitur Utama

- **Rich-Text Editor untuk Tulisan Panjang:** Pembuatan artikel atau cerpen dengan dukungan pemformatan teks lengkap (_bold, italic, headings_) serta penyimpanan draf otomatis.
- **Interaksi Sosial Dinamis:** Fitur mengikuti (_follow_) kreator lain, menyukai (_like_), menyimpan konten (_bookmark_), dan sistem komentar bersarang (_nested comments_).
- **Pencarian & Filter Instan:** Memudahkan pengguna menemukan tulisan atau blog berdasarkan tag, kategori terpopuler, maupun nama penulis.
- **Desain Responsif & Mode Gelap:** Antarmuka modern yang ramah diakses melalui ponsel pintar, tablet, maupun desktop menggunakan Tailwind CSS.
- **Server-Side Rendering (SSR) & SEO Optimized:** Pengisian konten tulisan yang di-render di sisi server untuk pemuatan halaman super cepat dan ramah mesin pencari.

---

## Tech Stack (Teknologi yang Digunakan)

Aplikasi ini mengadopsi ekosistem teknologi modern berikut:

- **Frontend Framework:** [Next.js](https://nextjs.org/) (App Router & React)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** Zustand / React Context API
- **Data Fetching & Integrasi:** Axios / TanStack Query (React Query) untuk konsumsi REST API secara asinkronus.
- **Autentikasi:** NextAuth.js / JWT

---

## Memulai (Instalasi Lokal)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer lokal Anda:

### Prasyarat

Pastikan Anda sudah menginstal perangkat lunak berikut:

- **Node.js** (Versi v18.x atau yang terbaru)
- **pnpm**

### Langkah Instalasi

1. **Klon Repositori:**

   ```bash
   git clone [https://github.com/hunafazaky/pamacha-app](https://github.com/hunafazaky/pamacha-app)
   cd pamacha-app
   ```

2. **Instal Dependensi:**

   ```bash
   pnpm install
   ```

3. **Konfigurasi Environment Variables:**
   Buat berkas `.env.local` di direktori utama (_root_) proyek Anda, kemudian lengkapi variabel berikut sesuai dengan konfigurasi API Anda:

   ```env
   NEXT_PUBLIC_API_BASE_URL=[https://api.domainanda.com/v1](https://api.domainanda.com/v1)
   NEXTAUTH_SECRET=rahasia_jwt_anda_disini
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Jalankan Server Pengembangan:**
   ```bash
   pnpm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada peramban web Anda untuk melihat aplikasi berjalan.

---

## 📂 Struktur Folder Utama

Struktur folder proyek ini menggunakan standar Next.js App Router yang bersih dan modular:

```text

├── app/
│   ├── (authentication)/
│   │   ├── signin/
│   │   └── signup/        #TBA
│   └── (home)/
│       ├── users/         #TBA
│       └── works/
├── components/
├── hooks/
├── lib/
├── public/
└── tsconfig.json

```

---

## 🤝 Kontribusi

Kontribusi dari pengembang lain sangat dihargai! Jika Anda ingin memperbaiki _bug_ atau menambahkan fitur baru:

1. Lakukan **Fork** pada proyek ini.
2. Buat branch fitur baru (`git checkout -b fitur/FiturKeren`).
3. Lakukan commit atas perubahan Anda (`git commit -m 'Menambahkan Fitur Keren Baru'`).
4. Push ke branch tersebut (`git push origin fitur/FiturKeren`).
5. Buka sebuah **Pull Request**.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - Lihat berkas [LICENSE](LICENSE) untuk detail lebih lanjut.

---

## ✉️ Kontak / Pengembang

- **Hunafa Zaky** - [hunafa.zsn@gmail.com](mailto:hunafa.zsn@gmail.com)
- **GitHub:** [@hunafazaky](https://github.com/hunafazaky)
- **LinkedIn:** [Zaky Syi'ar Hunafa Nugroho](https://linkedin.com/in/hunafazaky)
