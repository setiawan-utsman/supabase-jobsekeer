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
    default: "Job Seeker – Temukan Karier Impianmu",
    template: "%s | Job Seeker",
  },
  description:
    "Platform pencarian kerja terbaik untuk menemukan lowongan sesuai keahlianmu. Dibangun menggunakan Next.js modern dan teknologi React terkini.",
  keywords: [
    "Job Seeker",
    "Lowongan Kerja",
    "Karier",
    "Next.js",
    "React",
    "Frontend Developer",
  ],
  authors: [{ name: "Job Seeker Team" }],
  creator: "Job Seeker",
  metadataBase: new URL("https://supabase-jobsekeer.vercel.app"),
  openGraph: {
    title: "Job Seeker – Temukan Karier Impianmu",
    description:
      "Platform pencarian kerja terbaik untuk menemukan lowongan sesuai keahlianmu.",
    url: "https://yourdomain.com",
    siteName: "Job Seeker",
    images: [
      {
        url: "/illustrations/logo.png",
        width: 1200,
        height: 630,
        alt: "Job Seeker",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Seeker",
    description: "Temukan karier impianmu di platform Job Seeker.",
  },
  icons: {
    icon: "/illustrations/16x16.png",
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
