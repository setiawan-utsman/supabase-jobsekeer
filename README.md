This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🧭 App Jobs Seeker

Aplikasi web modern berbasis **Next.js** dan **Supabase** untuk mengelola data pelamar kerja (jobseeker).  
Proyek ini mendukung fitur CRUD, upload foto profil, pencarian, dan paginasi data pelamar.

---

## 🚀 Gambaran Proyek

**App Jobs Seeker** dibuat untuk membantu perekrut atau admin dalam mengelola data pelamar kerja dengan mudah.  
Fitur utama yang disediakan antara lain:

- Melihat dan mengelola profil pelamar kerja  
- Upload foto profil ke Supabase Storage  
- Pencarian (search) dan filter data pelamar  
- Paginasi untuk data dalam jumlah besar  
- Integrasi penuh dengan **Supabase** untuk database dan autentikasi  
- Manajemen state menggunakan **Zustand** dan **React Query**  

---

## 🧰 Teknologi yang Digunakan

### **Frontend**
- [Next.js 15](https://nextjs.org/) – Framework React modern  
- [React 19](https://react.dev/) – Library UI utama  
- [Tailwind CSS 4](https://tailwindcss.com/) – Framework CSS berbasis utility  
- [Radix UI](https://www.radix-ui.com/) – Komponen UI aksesibel untuk React  
- [Lucide React](https://lucide.dev/) – Ikon open-source untuk React  
- [Sonner](https://sonner.emilkowal.ski/) – Toast notification elegan  

### **Backend / Database**
- [Supabase](https://supabase.com/) – Platform database (PostgreSQL), autentikasi, dan penyimpanan  

### **Manajemen State**
- [Zustand](https://zustand-demo.pmnd.rs/) – Manajemen state global ringan  
- [React Query](https://tanstack.com/query) – Sinkronisasi state server  

### **Utilities**
- [Lodash](https://lodash.com/) – Fungsi utilitas untuk manipulasi data  
- [React Hook Form](https://react-hook-form.com/) – Pengelolaan form dan validasi  

---

## 🛠️ Cara Menjalankan Secara Lokal

### 1. Clone repository ini
```bash
git clone https://github.com/username/supabase-jobsekeer.git
cd app-jobs-seeker
