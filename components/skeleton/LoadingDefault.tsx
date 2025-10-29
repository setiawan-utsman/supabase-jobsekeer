import React from 'react'

export default function LoadingDefault({className}: {className?: string}) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[calc(100vh-6rem)] ${className}`}
    >
      <div className="space-y-3 flex items-center flex-col">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-semibold text-lg">Memuat data...</div>
      </div>
    </div>
  );
}

export function NoData({className, title, desc, isImage=false}: {className?: string, title?: string, desc?: string, isImage?: boolean}) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[calc(100vh-12rem)] ${className}`}>
      <div className="space-y-1 flex flex-col items-center">
       {isImage && <img src="/illustrations/no-job.png" alt="No Jobs" className='w-50 h-50' />}
        <div className="font-semibold text-lg">
          {title}
        </div>
        <div className="text-gray-500 text-sm text-center leading-5">
          {desc}
        </div>
      </div>
    </div>
  );
}

