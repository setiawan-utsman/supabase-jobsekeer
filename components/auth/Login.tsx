"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginUser } from "@/services/auth";
import { setAuthToken } from "./auth";

// const shema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

interface IFormLogin {
  email: string;
  password: string;
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const loginService = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: any) => {
      const session = data?.session;
      setAuthToken(session.access_token);
      router.push("/jobs");
    },
    onError: (error) => {
      //  console.error("Login gagal ❌", error);
      //  toast.error("Login gagal.", {
      //    duration: 3000,
      //    position: "top-center",
      //    style: { backgroundColor: "#f96161", color: "white" },
      //  });
    },
  });

  const onSubmit = (formData: any) => {
    loginService.mutate(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 space-y-3">
      <div className="space-y-1">
        <div className="text-lg font-semibold">Masuk ke Rakamin</div>
        <div className="text-sm text-gray-600/30">
          Belum punya akun?
          <a href="/register" className="text-primary ps-1 font-semibold">
            Daftar
          </a>
        </div>
      </div>

      {loginService.isError && (
        <div className="shadow-md bg-red-200/10 flex justify-center items-center border-red-300/50 border rounded-md h-15 text-red-400 px-3 py-1 text-center">
          {(loginService.error as any).message}
        </div>
      )}
      <form className="space-y-5">
        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700 ">
            Email
          </Label>
          <Input
            type="email"
            {...register("email")}
            name="email"
            placeholder="Email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {/* {errors.username && (
          <p className="text-red-500 text-base">{errors.username.message}</p>
        )} */}
        </div>

        <div className="relative space-y-2">
          <Label className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            type={isShowPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)();
              }
            }}
          />
          {/* {errors.password && (
          <p className="text-red-500 text-base">{errors.password.message}</p>
        )} */}
          <div
            className="absolute top-10 right-4 flex items-center"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <div className="text-gray-400">
              {isShowPassword ? (
                <EyeIcon width={20} height={20} />
              ) : (
                <EyeOffIcon width={20} height={20} />
              )}
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          variant={"default"}
          disabled={loginService.isPending}
          className="text-white w-full rounded-md h-11 cursor-pointer"
        >
          {loginService.isPending ? "Loading..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
}
