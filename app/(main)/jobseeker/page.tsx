"use client";
import FormSearch from "@/components/FormSearch";
import JobSeekerDetail from "@/components/jobseeker/JobSeekerDetail";
import JobSeekerListWidget from "@/components/jobseeker/JobSeekerListWidget";
import DynamicPagination from "@/components/Pagination";
import LoadingDefault, { NoData } from "@/components/skeleton/LoadingDefault";
import LoadingJobs from "@/components/skeleton/LoadingJobs";
import { Button } from "@/components/ui/button";
import { getJobs } from "@/services/job";
import { useJobSekeerStore } from "@/store/useJobSekeerStore";
import { useQuery } from "@tanstack/react-query";
import { size } from "lodash";
import { PlusIcon, SortAscIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export default function JobSeekerPage() {
  const router = useRouter();
  const { setCardActive, search, setSearch, currentPage, setCurrentPage,  sort, setSort} = useJobSekeerStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs-seeker", search, currentPage, sort],
    queryFn: async () => getJobs({search, page: currentPage, limit: 5, sortBy: 'created_at', sortOrder: sort }),
  });

  useEffect(() => {
    const _data: any = data?.data;
    if (Boolean(_data)) {
      setCardActive(_data[0]);
    }
  }, [data]);

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
    <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-8">
      <div className="space-y-4 relative">
        <div className="flex items-center gap-3">
          <FormSearch
            isIcon={true}
            callbackData={(data: string) => setSearch(data)}
          />
          <Button
            className="text-white cursor-pointer"
            onClick={() => router.push("/jobs")}
          >
            <PlusIcon />
            Add Jobs
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-semibold">
            Total Job : <span className="text-primary">{data?.count}</span>
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
          <LoadingJobs />
        ) : (
          <>
            {!Boolean(size(data?.data)) && !isLoading && (
              <NoData
                className="h-[calc(100vh-12rem)]"
                title=" Belum Ada Lowongan Pekerjaan"
                desc="Anda belum membuat lowongan pekerjaan. Mulai buat lowongan pertama Anda untuk menemukan kandidat terbaik."
              />
            )}
          </>
        )}
        {Boolean(size(data?.data)) && !isLoading && (
          <>
            {data?.data?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <JobSeekerListWidget item={item} />
              </React.Fragment>
            ))}
          </>
        )}

        <DynamicPagination
          totalItems={data?.count || 0}
          itemsPerPage={5}
          currentPage={currentPage}
          onPageChange={goToPage}
          maxVisiblePages={20}
        />
      </div>
      <div className="md:col-span-3 sm:col-span-1">
        {isLoading ? (
          <LoadingDefault className="h-[calc(100vh-12rem)]" />
        ) : (
          <>
            {!Boolean(size(data?.data)) && !isLoading && (
              <NoData
                className="h-[calc(100vh-12rem)]"
                title="Tidak ada lowongan pekerjaan yang tersedia"
                desc="Mohon tunggu pembukaan batch berikutnya."
                isImage={true}
              />
            )}
          </>
        )}
        {Boolean(size(data?.data)) && !isLoading && <JobSeekerDetail />}
      </div>
    </div>
  );
}
