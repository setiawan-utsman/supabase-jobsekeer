import Login from "@/components/auth/Login";
import Image from "next/image";
// import Image from 'next/image';
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Kiri: Form Login */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-96">
          {/* Logo */}
          <div className="mb-8 relative">
            {/* <img src="/illustrations/logo.png" alt="Logo" width={250}  height={250}/> */}
            <Image
              src="/illustrations/logo.png"
              alt="Logo"
              width={120}
              height={100}
              className="cursor-pointer"
            />
          </div>

          <Login />
        </div>
      </div>
    </div>
  );
}
