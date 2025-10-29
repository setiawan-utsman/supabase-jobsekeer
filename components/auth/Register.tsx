"use client";
import { registerUser } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
interface IFromRegister {
  email: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFromRegister>();
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const onSubmit = (formData: any) => {
    registerService.mutate(formData);
  };

  const registerService = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      router.push("/login");
    },
    onError: (error) => {
      console.log(error?.message, "isi errorr");
    },
  });

  return (
    <div className="bg-white shadow-md rounded-md p-4 space-y-3">
      <div className="space-y-1">
        <div className="text-lg font-semibold">Bergabung dengan Rakamin</div>
        <div className="text-sm text-gray-600/50">
          Sudah punya akun?
          <a href="/login" className="text-primary ps-1 font-semibold">
            Masuk
          </a>
        </div>
      </div>

      {/* <div className='shadow-md bg-red-200/10 flex justify-center items-center border-red-300/50 border rounded-md h-15 text-red-400'>
       Error password tidak sah
      </div> */}
      {registerService.isError && (
        <div className="shadow-md bg-red-200/10 flex justify-center items-center border-red-300/50 border rounded-md h-15 text-red-400 px-3 py-1 text-center">
          {(registerService.error as any).message}
        </div>
        // <p className="text-red-500"></p>
      )}
      <form className="space-y-5">
        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-700 ">
            Email
          </Label>
          <Input
            type="email"
            {...register("email", { required: true })}
            name="email"
            placeholder="Email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="relative space-y-2">
          <Label className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            type={isShowPassword ? "text" : "password"}
            {...register("password", { required: true })}
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
          disabled={registerService.isPending}
          className="text-white w-full rounded-md h-11 cursor-pointer"
        >
          {registerService.isPending ? "Tunggu..." : "Daftar"}
        </Button>
      </form>
    </div>
  );
}
