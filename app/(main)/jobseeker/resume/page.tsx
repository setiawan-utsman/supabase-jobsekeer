'use client';
import ResumeForm from '@/components/jobseeker/ResumeForm';
import { getJobById } from '@/services/job';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ResumePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const {data} = useQuery({
        queryKey: ["jobseeker-resume", id],
        queryFn: async () => getJobById(id),
    })

    
  return (
    <div className="flex justify-center">
      <ResumeForm data={data} jobId={id}  />
    </div>
  );
}
