'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'
interface IndexProps {
    children?: React.ReactNode
}
export default function Index({ children }: IndexProps) {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
}
