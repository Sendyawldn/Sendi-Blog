# Sendi Blog

Blog pribadi berbasis **Next.js 16 + App Router** dengan konten artikel dari file **MDX**. Tampilan dibuat dengan nuansa dark theme, animasi ringan menggunakan Framer Motion, dan halaman artikel yang mendukung metadata tambahan seperti skor Turnitin serta daftar referensi.

## Fitur Utama

- Landing page profil singkat + daftar tulisan terbaru.
- Halaman daftar semua artikel (`/blog`).
- Halaman detail artikel dinamis (`/blog/[slug]`) dari file MDX.
- Sorting artikel berdasarkan tanggal terbaru.
- Metadata artikel tambahan:
  - `turnitin` untuk menampilkan indikator persentase kemiripan.
  - `references` untuk menampilkan daftar sumber.
- UI modern dengan Tailwind CSS v4 dan font Google (`Space Grotesk`, `Lora`, `JetBrains Mono`).

## Tech Stack

- **Framework:** Next.js 16.2.3
- **Language:** TypeScript
- **UI:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Content Parsing:** gray-matter + next-mdx-remote

## Struktur Proyek

```txt
.
├── content/blog/            # Seluruh konten artikel .mdx
├── public/                  # Aset statis (gambar profil, ikon)
├── src/
│   ├── app/                 # Routing App Router
│   │   ├── blog/
│   │   │   ├── [slug]/      # Halaman detail artikel
│   │   │   └── page.tsx     # Halaman daftar artikel
│   │   ├── layout.tsx       # Layout global
│   │   └── page.tsx         # Homepage
│   ├── components/          # Komponen UI (Navbar, Footer, HomeView)
│   └── lib/mdx.ts           # Loader & parser metadata artikel MDX
├── package.json
└── README.md
```

## Menjalankan Project

### 1) Install dependency

```bash
npm install
```

### 2) Jalankan mode development

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

### 3) Build production

```bash
npm run build
```

### 4) Jalankan hasil build

```bash
npm run start
```

## Menulis Artikel Baru

Tambahkan file baru di folder `content/blog/` dengan format:

```mdx
---
title: "Judul Artikel"
date: "2026-04-28"
excerpt: "Ringkasan singkat artikel."
turnitin:
  score: 12
  label: "Sangat Orisinal"
references:
  - title: "Nama Sumber"
    url: "https://example.com"
  - title: "Buku atau jurnal tanpa URL"
---

Konten artikel ditulis di sini menggunakan MDX.
```

### Catatan metadata

- `title`, `date`, dan `excerpt` digunakan di halaman list/home.
- Nama file akan otomatis menjadi `slug` URL.
  - Contoh: `hello-world.mdx` → `/blog/hello-world`
- `turnitin` dan `references` bersifat opsional.

## Script NPM

- `npm run dev` → Menjalankan server development.
- `npm run build` → Build aplikasi untuk production.
- `npm run start` → Menjalankan hasil build.
- `npm run lint` → Menjalankan ESLint.
