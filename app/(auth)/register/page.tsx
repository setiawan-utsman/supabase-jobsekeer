import Register from "@/components/auth/Register";
import Image from "next/image";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Kiri: Form Login */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-96">
          {/* Logo */}
          <div className="mb-8 relative">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={120}
              height={100}
              className="cursor-pointer"
            />
          </div>
          <Register />
        </div>
      </div>
    </div>
  );
}
