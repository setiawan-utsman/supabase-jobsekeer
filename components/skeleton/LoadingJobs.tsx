import React from "react";

interface ISkeletonJobsProps {
  count?: number;
}

export default function LoadingJobs({ count = 3 }: ISkeletonJobsProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="rounded-2xl shadow-sm border border-gray-200 p-6 w-full"
          key={index}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-8 w-44 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-5 w-64 bg-gray-200 rounded-lg animate-pulse mb-3"></div>
              <div className="h-6 w-80 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
