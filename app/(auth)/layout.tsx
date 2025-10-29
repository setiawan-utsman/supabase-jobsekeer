import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import React, { Suspense } from 'react'
import LoadingAuth from './loading';

export default function AuthLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AnimatedGroup
        className="h-full"
        preset="fade"
        as={"div"}
        variants={{
          item: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "easeInOut",
              },
            },
          },
        }}
      >
        <Suspense fallback={<LoadingAuth />}>{children}</Suspense>
      </AnimatedGroup>
    </div>
  );
}
