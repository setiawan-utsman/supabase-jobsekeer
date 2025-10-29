import Image from 'next/image';
import React from 'react'

export default function LoadingMain() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center text-center p-8">
        <div className="mb-2">
          <Image
            width={120}
            height={120}
            src="/illustrations/logo.png"
            alt="Logo"
          />
        </div>
        {/* <h1 className="text-4xl font-bold text-background-dark dark:text-background-light">
          Ada job baru di Rakamin
        </h1> */}
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400 max-w-sm">
          Memuat data dan mempersiapkan pengalaman terbaik untuk Anda.
        </p>
        <div className="mt-8">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
