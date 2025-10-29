"use client";
import FormSearch from "@/components/FormSearch";
import ManageTableWidget from "@/components/jobs/ManageTableWidget";
import NoDataCandidate from "@/components/notfound/NoDataCandidate";
import DynamicPagination from "@/components/Pagination";
import LoadingDefault from "@/components/skeleton/LoadingDefault";
import { getJobseekers } from "@/services/jobsekeer";
import { useJobStore } from "@/store/useJobStore";
import { useQuery } from "@tanstack/react-query";
import { size } from "lodash";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ManagePage() {
  const { search, setSearch, currentPage, setCurrentPage } = useJobStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs-manage", id, search, currentPage],
    queryFn: async () => getJobseekers({ jobId: id , search, page: currentPage, limit: 10 }),
  });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= data!.totalPages) {
        setCurrentPage(page);
      }
    };

    console.log(data);
    

  return (
    <div className="space-y-5">
      {/* <div className="font-semibold text-lg">Font End Developer</div> */}
      <div className="w-96">
        <FormSearch
          isIcon={true}
          callbackData={(data: string) => setSearch(data)}
        />
      </div>

      {isLoading ? (
        <LoadingDefault className="h-[calc(100vh-12rem)]" />
      ) : (
        <>{!Boolean(size(data?.data)) && !isLoading && <NoDataCandidate className="h-[calc(100vh-12rem)]" />}</>
      )}
      {Boolean(size(data?.data) && !isLoading) && (
        <div className="w-full border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
          <ManageTableWidget data={data?.data} />
        </div>
      )}

      <DynamicPagination
        totalItems={data?.count || 0}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={goToPage}
        maxVisiblePages={20}
      />
    </div>
  );
}
