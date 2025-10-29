import { SearchIcon } from 'lucide-react'
import React, { ChangeEvent } from 'react'
// import _ from "lodash";
import { debounce } from "lodash"

interface IForm {
    className?: string
    callbackData?: (x: string) => void
    type?: string
    placeholder?: string
    isIcon?: boolean
}

export default function FormSearch({className, callbackData, type='text', placeholder='Cari', isIcon=false}: IForm) {

const debouncedSearch =debounce((value: string) => {
  if(callbackData) callbackData(value);
}, 800);

const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
  debouncedSearch(event.target.value);
};


  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300/50 rounded-md px-4 py-2 w-full placeholder:text-gray-500 ${className}`}
        onChange={handleOnChangeSearch}
      />
      {isIcon && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </div>
      )}
    </div>
  );
}
