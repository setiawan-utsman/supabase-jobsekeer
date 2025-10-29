import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, AsteriskIcon, StarsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { createJobseeker } from "@/services/jobsekeer";
import { useRouter } from "next/navigation";
import PhotoProfileUpload from "./PhotoProfileUpload";
import { toast } from "sonner";

interface IResumeForm {
  full_name: string;
  domicile: string;
  email: string;
  phone_number: string;
  linkedin_link: string;
  date_of_birth: string;
  photo_profile: string;
  gender: string;
}

export default function ResumeForm({ data, jobId }: { data: any, jobId: any }) {
  const config = data?.profile_information;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResumeForm>();


  const applyJobService = useMutation({
    mutationFn: createJobseeker,
    onSuccess: (data) => {
       toast.success("Your application has been submitted successfully", {
         duration: 4000,
         style: { backgroundColor: "#fff", borderRadius: "10px" },
       });
      router.push("/jobseeker");
    }
  });

  const applyJob = (data: any) => {
     const params = {
       job_id: jobId,
       ...data
     };
     applyJobService.mutate(params);
     
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 space-y-3 w-175 border border-gray-300/50">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Button className="border-gray-300" variant={"outline"} size={"icon"} onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <div className="font-semibold">Apply {data?.title} at Rakamin</div>
        </div>
        <div className="text-sm text-gray-400">This field required to fill</div>
      </div>
      <div className="text-red-500 flex items-center gap-1 text-sm">
        <div>
          <AsteriskIcon width={10} height={10} />
        </div>
        <div>Required</div>
      </div>

      <form
        className="space-y-4 transition-all ease-in-out duration-500"
        onSubmit={handleSubmit(applyJob)}
      >
        <PhotoProfileUpload />
        {/* FULL NAME */}
        {config?.["Full name"] !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="full-name"
            >
              Nama Lengkap
              {config?.["Full name"] === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <Input
              className="h-10 text-base border-gray-300"
              id="full-name"
              placeholder="Masukan Nama Lengkap"
              type="text"
              {...register("full_name", {
                required:
                  config?.["Full name"] === "Mandatory" &&
                  "Nama lengkap wajib diisi",
              })}
            />
            {errors.full_name && (
              <p className="text-sm text-red-500">
                {String(errors.full_name.message)}
              </p>
            )}
          </div>
        )}

        {/* DATE OF BIRTH */}
        {config?.["Date of birth"] !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="dob"
            >
              Tanggal Lahir
              {config?.["Date of birth"] === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <Input
              className="h-10 text-base border-gray-300"
              id="dob"
              type="date"
              {...register("date_of_birth", {
                required:
                  config?.["Date of birth"] === "Mandatory" &&
                  "Tanggal lahir wajib diisi",
              })}
            />
          </div>
        )}

        {/* GENDER */}
        {config?.Gender !== "Off" && (
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-700/70 flex items-center gap-1">
              Jenis Kelamin
              {config?.Gender === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <input
                    className="w-4 h-4"
                    id="gender"
                    type="radio"
                    value="female"
                    {...register("gender", {
                      required:
                        config?.Gender === "Mandatory" &&
                        "Jenis kelamin wajib diisi",
                    })}
                  />
                  <label className="px-2" htmlFor="gender">
                    Perempuan
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    className="w-4 h-4"
                    id="gender-male"
                    type="radio"
                    value="male"
                    {...register("gender", {
                      required:
                        config?.Gender === "Mandatory" &&
                        "Jenis kelamin wajib diisi",
                    })}
                  />
                  <label className="px-2" htmlFor="gender-male">
                    Laki-laki
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DOMICILE */}
        {config?.Domicile !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="domicile"
            >
              Domisili
              {config?.Domicile === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <Input
              className="h-10 text-base border-gray-300"
              id="domicile"
              placeholder="Ex: Jakarta"
              type="text"
              {...register("domicile", {
                required:
                  config?.Domicile === "Mandatory" && "Domisili wajib diisi",
              })}
            />
            {errors.domicile && (
              <p className="text-sm text-red-500">
                {String(errors.domicile.message)}
              </p>
            )}
          </div>
        )}

        {/* PHONE NUMBER */}
        {config?.["Phone number"] !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="phone"
            >
              Nomor Telepon
              {config?.["Phone number"] === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                className="h-10 text-base border-gray-300"
                id="phone"
                placeholder="Ex: +62 812 3456 7890"
                type="number"
                {...register("phone_number", {
                  required:
                    config?.["Phone number"] === "Mandatory" &&
                    "Nomor telepon wajib diisi",
                })}
              />
              <div className="absolute top-3 right-2 shadow-md">
                <img
                  src="/illustrations/flag-id.png"
                  alt="Indonesia"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        )}

        {/* EMAIL */}
        {config?.Email !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="email"
            >
              Email
              {config?.Email === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <Input
              className="h-10 text-base border-gray-300"
              id="email"
              placeholder="Ex: example@mail.com"
              type="email"
              {...register("email", {
                required: config?.Email === "Mandatory" && "Email wajib diisi",
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {String(errors.email.message)}
              </p>
            )}
          </div>
        )}

        {/* LINKEDIN */}
        {config?.["LinkedIn link"] !== "Off" && (
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-700/70 flex items-center gap-1"
              htmlFor="linkedin"
            >
              LinkedIn Link
              {config?.["LinkedIn link"] === "Mandatory" && (
                <span className="text-red-400">
                  <AsteriskIcon width={13} height={13} />
                </span>
              )}
            </Label>
            <Input
              className="h-10 text-base border-gray-300"
              id="linkedin"
              placeholder="Ex: https://linkedin.com/in/username"
              type="url"
              {...register("linkedin_link", {
                required:
                  config?.["LinkedIn link"] === "Mandatory" &&
                  "LinkedIn link wajib diisi",
              })}
            />
          </div>
        )}

        <Button
          className="rounded-md text-white w-full h-10"
          variant={"default"}
          type="submit"
          disabled={applyJobService?.isPending}
        >
          {applyJobService?.isPending ? "Loading..." : "SIMPAN"}
        </Button>
      </form>
    </div>
  );
}
