"use client";
import FormSearch from "@/components/FormSearch";
import ManageTableWidget from "@/components/jobs/ManageTableWidget";
import NoDataCandidate from "@/components/notfound/NoDataCandidate";
import DynamicPagination from "@/components/Pagination";
import LoadingDefault from "@/components/skeleton/LoadingDefault";
import { Button } from "@/components/ui/button";
import { getJobseekers } from "@/services/jobsekeer";
import { useJobStore } from "@/store/useJobStore";
import { useQuery } from "@tanstack/react-query";
import { size } from "lodash";
import { SortAscIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export default function ManagePage() {
  const { search, setSearch, currentPage, setCurrentPage, sort, setSort } = useJobStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useQuery({
    queryKey: ["jobs-manage", id, search, currentPage, sort],
    queryFn: async () => getJobseekers({ jobId: id , search, page: currentPage, limit: 10, sortBy: 'full_name', sortOrder: sort }),
  });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= data!.totalPages) {
        setCurrentPage(page);
      }
    };

      const handleSort = useCallback(() => {
        if (sort === "asc") {
          setSort("desc");
        } else {
          setSort("asc");
        }
      }, [sort]);

  return (
    <div className="space-y-5">
      {/* <div className="w-96">
        <FormSearch
          isIcon={true}
          callbackData={(data: string) => setSearch(data)}
        />
      </div> */}

      <div className="flex justify-between items-center w-full">
        <div className="text-lg">
          Total data :{" "}
          <span className="font-semibold text-primary">{data?.count}</span>
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
        <LoadingDefault className="h-[calc(100vh-12rem)]" />
      ) : (
        <>
          {!Boolean(size(data?.data)) && !isLoading && (
            <NoDataCandidate className="h-[calc(100vh-12rem)]" />
          )}
        </>
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
