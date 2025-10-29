import Header from '@/components/layout/Header';
import React, { Suspense } from 'react'
import LoadingMain from './loading';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div id="header" className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="sticky top-0 z-50 border-b border-gray-300/50 bg-gray-50/80 backdrop-blur-md shadow-primary/10 shadow-sm">
        <Header />
      </header>

      {/* Content Section */}
      <main id="content" className="container mx-auto px-6 py-8">
        {/* <Suspense fallback={<LoadingMain />}>
        {children}
        </Suspense> */}
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
          <Suspense fallback={<LoadingMain />}>{children}</Suspense>
        </AnimatedGroup>
      </main>
    </div>
  );
}
