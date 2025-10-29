'use client'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button';
import { UploadIcon } from 'lucide-react';

export default function PhotoProfileUpload() {
const [preview, setPreview] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    
}
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-200">
        <img
          src={
           preview || "/illustrations/avatar.png"
          }
          alt="Profile Photo"
          className="object-cover w-full h-full"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 w-fit border-gray-300"
      >
        <UploadIcon className="w-4 h-4" />
        Take a Picture
      </Button>
    </div>
  );
}
