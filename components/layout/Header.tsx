"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { LABELSMENU } from "@/public/data/data";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { clearAuthToken } from "../auth/auth";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/services/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

   const { mutate: LogoutService, isPending } = useMutation({
     mutationFn: logoutUser,
     onSuccess: async() => {
        // await clearAuthToken();
        router.replace("/login"); // ✅ Lebih aman
     },
     onError: (err) => {
       console.error("Logout gagal:", err);
     },
   });

  return (
    <div className="container mx-auto h-15 flex items-center justify-between px-6">
      {/* Left: Title */}
      <div className="space-x-2 flex items-center">
        <Image
          onClick={() => router.push("/jobseeker")}
          src="/illustrations/logo.png"
          alt="Logo"
          width={120}
          height={100}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-3">
          {paths?.map((segment, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/");
            const label =
              LABELSMENU[segment] ||
              segment.charAt(0).toUpperCase() + segment.slice(1);
            return (
              <React.Fragment key={index}>
                <div className="relative bg-white last:bg-primary/10 last:text-primary last:border-primary/10 last:shadow-none">
                  <Button
                    className="capitalize border-gray-300 "
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => router.push(href)}
                  >
                    {label}
                  </Button>
                </div>
                <div className=" text-gray-400 last:hidden">/</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* <h1 className="text-base font-semibold text-gray-800">Job List</h1> */}

      {/* Right: Logout */}
      <button
        type="button"
        className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200 cursor-pointer"
        onClick={() => LogoutService()}
      >
        <LogOutIcon />
      </button>
    </div>
  );
}
