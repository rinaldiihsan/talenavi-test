import Navigation from '@/components/Navigation/Navigation';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center py-12">
      <Navigation />
      <div className="flex flex-col items-center justify-center h-[15rem]">
        <h1 className="font-semibold font uppercase text-xl text-center">This page under construction.</h1>
      </div>
    </main>
  );
}
