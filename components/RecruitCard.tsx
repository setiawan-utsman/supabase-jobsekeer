import React from 'react'

interface IRecruitCard {
  callbackData?: (x: boolean) => void
}

export default function RecruitCard({callbackData}: IRecruitCard) {

  return (
    <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60"
        alt="Recruit the best candidates"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-start px-6 py-4">
        <h2 className="text-white font-semibold text-lg mb-1">
          Recruit the best candidates
        </h2>
        <p className="text-white text-sm mb-4">
          Create jobs, invite, and hire with ease
        </p>

        {/* Button */}
        <button className="relative w-full bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition-all cursor-pointer"
          onClick={() => {
            if(callbackData) callbackData(true);
          }}
        >
          Create a new job
        </button>
      </div>
    </div>
  );
}
