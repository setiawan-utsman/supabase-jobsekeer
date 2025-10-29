import React, { Fragment, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { AsteriskIcon, XIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input, Textarea } from '../ui/input';
import { useForm } from 'react-hook-form';
import { MinimumProfileInformation } from '@/public/data/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJob, updateJob } from '@/services/job';
import { toast } from 'sonner';


interface IModalProps {
    isOpen: boolean
    onClose: () => void
    data?: any
}

interface IFormInput {
  title: string;
  description: string;
  job_type: string;
  status: boolean;
  salary_range: {
    min: number;
    max: number;
  };
  profile_information: Record<string, string>;
}

export default function ModalJobs({ isOpen, onClose, data }: IModalProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      profile_information: {
        "Full name": "Mandatory",
        "Photo Profile": "Mandatory",
        Gender: "Off",
        Domicile: "Mandatory",
        Email: "Mandatory",
        "Phone number": "Mandatory",
        "LinkedIn link": "Mandatory",
        "Date of birth": "Mandatory",
      },
    },
  });

  // console.log(data?.title, "data");

    useEffect(() => {
      if (Boolean(data)) reset(data);
      else resetDefault();
    }, [data]);


    const onCloseModal = () => {
        resetDefault();
        onClose()
    }

const resetDefault = () => {
  reset({
    title: "",
    description: "",
    job_type: "full-time",
    status: false,
    salary_range: {
      min: 0,
      max: 0,
    },
    profile_information: {
      "Full name": "Mandatory",
      "Photo Profile": "Mandatory",
      Gender: "Off",
      Domicile: "Mandatory",
      Email: "Mandatory",
      "Phone number": "Mandatory",
      "LinkedIn link": "Mandatory",
      "Date of birth": "Mandatory",
    },
  });
};

    const handleOptionClick = (field: string, value: string) => {
      setValue(`profile_information.${field}`, value, { shouldValidate: true });
    };

    const handleSubmitForm = (xdata:any) => {
      const params = {
        ...xdata,
        slug: xdata.title.toLowerCase().replace(/\s+/g, "-"),
        status: xdata.status ? "active" : "inactive",
        salary_range: {
          ...xdata.salary_range,
          display_text: `Rp ${xdata.salary_range.min} - Rp ${xdata.salary_range.max}`,
        },
        list_card: {
          started_on_text: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          badge: xdata.status ? "Active" : "Inactive",
          cta: "Manage Job",
        },
      };

      if(data) update.mutate(params);
      else create.mutate(params);
    }


    const create = useMutation({
      mutationFn: createJob,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobs-list-widget"],
          exact: false,
        });
        toast.success("Your application has been submitted successfully", {
          duration: 4000,
          // position: "top-center",
          style: { backgroundColor: "#fff", borderRadius: "10px" },
        });
        onCloseModal();
      },
      onError: () => {
        toast.error("Missing required fields highlighted.",{
          duration: 4000,
          // position: "top-center",
          style: { backgroundColor: "#f6cece38", borderRadius: "10px" },
        });
      },
    });

    const update = useMutation({
      mutationFn: (updateData: any) => updateJob(data?.id, updateData),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["jobs-list-widget"],
          exact: false,
        });
        toast.success("Your application has been updated successfully", {
          duration: 4000,
          style: { backgroundColor: "#fff", borderRadius: "10px" },
        });
        onCloseModal();
      },
      onError: () => {
        toast.error("Missing required fields highlighted.",{
          duration: 4000,
          // position: "top-center",
          style: { backgroundColor: "#f6cece38", borderRadius: "10px" },
        });
      },
    });

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="lg:max-w-3xl max-w-md w-full p-6 px-3">
        <DialogHeader className="px-2">
          <DialogTitle>
            <div className="text-lg">Job Opening</div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[700px] overflow-visible overflow-y-scroll px-2">
          <form className="space-y-4 transition-all ease-in-out duration-500">
            <div className="space-y-2">
              <Label
                className="text-base font-medium text-gray-700/70"
                htmlFor="job-name"
              >
                Job Name{" "}
                <span className="text-red-400">
                  <AsteriskIcon width={15} height={15} />
                </span>
              </Label>
              <Input
                className="h-10 text-base border-gray-300"
                id="job-name"
                placeholder="Ex: Frontend Developer"
                type="text"
                {...register("title", { required: "Job name is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                className="text-base font-medium text-gray-700/70"
                htmlFor="job-type"
              >
                Job Type
              </Label>
              <select
                className="w-full h-9.5 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                id="job-type"
                {...register("job_type", { required: "Job type is required" })}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              {errors.job_type && (
                <p className="text-red-500 text-sm">
                  {errors.job_type.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                className="text-base font-medium text-gray-700/70"
                htmlFor="job-description"
              >
                Job Description{" "}
                <span className="text-red-400">
                  <AsteriskIcon width={15} height={15} />
                </span>
              </Label>
              <Textarea
                className="h-36 text-base border-gray-300"
                id="job-description"
                placeholder="Ex: I Am Frontend Developer"
                rows={5}
                // cols={33}
                {...register("description", { required: "Job description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                className="text-base font-medium text-gray-700/70"
                htmlFor="number-of-candidate"
              >
                Number of Candidat Needed
              </Label>
              <Input
                className="h-10 text-base border-gray-300"
                id="job-name"
                placeholder="Ex: 2"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label
                className="text-base font-medium text-gray-700/70"
                htmlFor="job-location"
              >
                Status Job
              </Label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="border-0 text-base shadow-none w-4 h-4"
                  id="job-status"
                  {...register("status")}
                />
                <div className="ml-2">
                  {watch("status") ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
            <div className="w-full border-b-2 border-gray-300 border-dashed"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label
                  className="text-base font-medium text-gray-700/70"
                  htmlFor="job-name"
                >
                  Job Salary
                </Label>
              </div>
              <div className="space-y-2">
                <Label
                  className="text-base font-medium text-gray-700/70"
                  htmlFor="min-salary"
                >
                  Minimum Estimated Salary{" "}
                  <span className="text-red-400">
                    <AsteriskIcon width={15} height={15} />
                  </span>
                </Label>
                <Input
                  className="h-10 text-base border-gray-300"
                  id="min-salary"
                  placeholder="Ex: 5.000.000"
                  type="text"
                  {...register("salary_range.min", { required: "Minimum salary is required" })}
                />
                {errors.salary_range?.min && (
                  <p className="text-red-500 text-sm">
                    {errors.salary_range.min.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  className="text-base font-medium text-gray-700/70"
                  htmlFor="max-salary"
                >
                  Maximum Estimated Salary{" "}
                  <span className="text-red-400">
                    <AsteriskIcon width={15} height={15} />
                  </span>
                </Label>
                <Input
                  className="h-10 text-base border-gray-300"
                  id="max-salary"
                  placeholder="Ex: 5.000.000"
                  type="text"
                  {...register("salary_range.max", { required: "Maximum salary is required" })}
                />
                {errors.salary_range?.max && (
                  <p className="text-red-500 text-sm">
                    {errors.salary_range.max.message}
                  </p>
                )}
              </div>
            </div>
            <div className="p-3 w-full border border-gray-300 rounded-md space-y-4">
              <div className="font-semibold text-lg">
                Minimum Profile Information Required
              </div>
              <ul role="list" className="space-y-4">
                {MinimumProfileInformation?.map((item, index) => (
                  <li
                    className="flex items-center justify-between first:pt-0 last:pb-0"
                    key={index}
                  >
                    <div className="text-capitalize">{item?.field}</div>
                    <div className="flex items-center gap-4">
                      {item?.options?.map((option, idx) => {
                        const isActive =
                          watch("profile_information")?.[item.field] === option;
                        return (
                          <div
                            className={`border rounded-3xl px-3 py-1 cursor-pointer text-sm ${
                              isActive
                                ? "bg-primary text-white border-primary"
                                : "text-gray-500/60 bg-gray-100 border-gray-100/50"
                            } cursor-pointer`}
                            key={idx}
                            onClick={() =>
                              handleOptionClick(item?.field, option)
                            }
                          >
                            {option}
                          </div>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-3 w-full">
            <button
              className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition-colors duration-200"
              onClick={handleSubmit(handleSubmitForm)}
              disabled={create.isPending || update.isPending}
            >
              {create.isPending || update.isPending ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
