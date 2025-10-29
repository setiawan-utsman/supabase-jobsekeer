// import Image from 'next/image';
import React from 'react'

export default function NoDataJobs() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src="/illustrations/no-job.png"
          alt="No Jobs"
          className='w-80 h-80'
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          No job openings available
        </h2>
        <p className="text-gray-500 mb-6">
          Create a job opening now and start the candidate process.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-5 py-2.5 rounded-lg shadow transition">
          Create a new job
        </button>
      </div>
    </div>
  );
}
