"use client";
import React, { useCallback, useState } from "react";
import FormSearch from "@/components/FormSearch";
import ModalJobs from "@/components/jobs/ModalJobs";
import RecruitCard from "@/components/RecruitCard";
import JobListWidget from "@/components/jobs/JobListWidget";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteJob, getJobs } from "@/services/job";
import { useJobStore } from "@/store/useJobStore";
import DynamicPagination from "@/components/Pagination";
import { useRouter } from "next/navigation";
import LoadingJobs from "@/components/skeleton/LoadingJobs";
import { size } from "lodash";
import NoDataJobs from "@/components/notfound/NoDataJobs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SortAscIcon } from "lucide-react";

export default function JobSekeerPage() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { search, setSearch, currentPage, setCurrentPage, sort, setSort } =
    useJobStore();
  const [dataEditJob, setDataEditJob] = useState<any>();
  const queryClient = useQueryClient();

  // const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs-list-widget", search, currentPage, sort],
    queryFn: async () => getJobs({ search, page: currentPage, limit: 4, sortBy: 'created_at', sortOrder: sort }),
  });

  const deleteService = useMutation({
    mutationFn: (id: string) => deleteJob(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs-list-widget"],
        exact: false,
      });
      toast.success("Job deleted successfully", {
        duration: 4000,
        // position: "top-center",
        style: { backgroundColor: "#f6cece38", borderRadius: "10px" },
      });
    },
  });

  const handleOpenModal = (e: boolean) => {
    if (e) {
      setIsOpen(true);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= data!.totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditJob = useCallback((data: any) => {
    if (!data?.delete) {
      setIsOpen(true);
      setDataEditJob(data);
    } else deleteService.mutate(data.id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setDataEditJob(null);
    setIsOpen(false);
  }, []);

  const handleSort = useCallback(() => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  }, [sort]);

  return (
    <>
      <div className="grid md:grid-cols-4 gap-10 xs:grid-cols-1">
        <div className="md:col-span-3 xs:col-span-1">
          <div className="space-y-4">
            <FormSearch
              isIcon={true}
              callbackData={(data: string) => setSearch(data)}
            />
            <div className="space-y-5">
              <div className="flex justify-between items-center w-full">
                <div className="text-lg">
                  Total data : <span className="font-semibold text-primary">{data?.count}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-lg">Urutkan:</div>
                  <Button
                    onClick={handleSort}
                    variant={"outline"}
                    className="border-gray-300"
                    size={"icon"}
                  >
                    {sort === "asc" ? (
                      <SortAscIcon className="w-4 h-4" />
                    ) : (
                      <SortAscIcon className="w-4 h-4 rotate-180" />
                    )}
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <LoadingJobs count={4} />
              ) : (
                <>
                  {!Boolean(size(data?.data)) && !isLoading && <NoDataJobs />}
                </>
              )}
              {!isLoading && Boolean(data?.data) && (
                <JobListWidget
                  data={data?.data}
                  callbackNavigate={(path: string) => router.push(path)}
                  callbackData={handleEditJob}
                />
              )}
            </div>
          </div>
        </div>
        <RecruitCard callbackData={handleOpenModal} />
        <div className="md:col-span-4 xs:col-span-1">
          <DynamicPagination
            totalItems={data?.count || 0}
            itemsPerPage={4}
            currentPage={currentPage}
            onPageChange={goToPage}
            maxVisiblePages={20}
          />
        </div>
      </div>

      {/* Modal Jobs */}
      <ModalJobs
        isOpen={isOpen}
        onClose={handleCloseModal}
        data={dataEditJob}
      />
    </>
  );
}
