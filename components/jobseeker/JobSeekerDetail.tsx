import React from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useJobSekeerStore } from '@/store/useJobSekeerStore';
import { useRouter } from 'next/navigation';

export default function JobSeekerDetail() {
const {cardActive} = useJobSekeerStore()
const router = useRouter();


  return (
    <Card className="w-full border-gray-400/40 px-4 py-3 gap-4">
      <div className="flex items-center gap-3">
        <img width={50} height={50} src="/illustrations/16x16.png" alt="Logo" />
        <div className="flex justify-between items-center w-full">
          <div className="space-y-1">
            <Card className="bg-primary text-white text-sm px-2 py-1 shadow-none max-w-fit capitalize">
              {cardActive?.job_type}
            </Card>
            <div className="font-semibold">{cardActive?.title}</div>
            <div className="text-sm text-gray-600/60">Rakamin</div>
          </div>
          <Button variant={'secondary'} size={'sm'}
          onClick={() => router.push(`/jobseeker/resume?id=${cardActive?.id}`)}>Apply</Button>
        </div>
      </div>
      <hr className='w-full border-gray-300/50 m-0' />
      <div className='text-sm'>{cardActive?.description}</div>
    </Card>
  );
}
