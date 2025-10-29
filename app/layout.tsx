// app/layout.tsx
import "./globals.css";
import Index from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

// ✅ SEO metadata
export const metadata: Metadata = {
  title: {
    default: "Job Seeker – Temukan Karier Impianmu | Lowongan Kerja Terbaru",
    template: "%s | Job Seeker",
  },
  description:
    "Platform pencarian kerja terpercaya di Indonesia. Temukan ribuan lowongan kerja terbaru dari perusahaan terkemuka. Lamar pekerjaan impianmu sekarang!",
  keywords: [
    "lowongan kerja",
    "cari kerja",
    "job vacancy",
    "karir",
    "rekrutmen",
    "lamaran kerja",
    "job seeker indonesia",
    "portal kerja",
    "job portal",
    "frontend developer jobs",
    "backend developer jobs",
    "fullstack developer jobs",
  ],
  authors: [{ name: "Job Seeker Team" }],
  creator: "Job Seeker",
  publisher: "Job Seeker",
  metadataBase: new URL("https://supabase-jobsekeer.vercel.app"),

  openGraph: {
    title: "Job Seeker – Temukan Karier Impianmu | Lowongan Kerja Terbaru",
    description:
      "Platform pencarian kerja terpercaya di Indonesia. Temukan ribuan lowongan kerja terbaru dari perusahaan terkemuka.",
    url: "https://supabase-jobsekeer.vercel.app",
    siteName: "Job Seeker",
    images: [
      {
        url: "/illustrations/logo.png",
        width: 1200,
        height: 630,
        alt: "Job Seeker - Platform Pencarian Kerja Terpercaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Job Seeker – Temukan Karier Impianmu",
    description:
      "Platform pencarian kerja terpercaya di Indonesia. Temukan ribuan lowongan kerja terbaru.",
    images: ["/illustrations/logo.png"],
  },

  icons: {
    icon: "/illustrations/16x16.png",
    shortcut: "/illustrations/16x16.png",
    apple: "/illustrations/logo.png",
  },

  // Alternate languages
  alternates: {
    canonical: "https://supabase-jobsekeer.vercel.app",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="/fonts/index.css" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Toaster />
        <Index>{children}</Index>
      </body>
    </html>
  );
}
