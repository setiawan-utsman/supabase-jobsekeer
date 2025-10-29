import React from 'react'

export default function NoDataCandidate({className}: {className?: string}) {
  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src="/illustrations/no-candidate.png"
          alt="No Jobs"
          className="w-80 h-80"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          No job openings available
        </h2>
        <p className="text-gray-500 mb-6">
          Share your job vacancies so that more candidates will apply.
        </p>
      </div>
    </div>
  );
}
