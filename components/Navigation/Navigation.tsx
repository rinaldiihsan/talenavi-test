'use client';

import { Album, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col max-w-[85rem] w-full">
      <div className="flex gap-x-8 relative">
        <div className="flex flex-col items-center gap-y-2">
          <Link href="/main-table" className="flex flex-row items-center justify-center gap-2 text-white">
            <Home className="h-5 w-5" />
            Main Table
          </Link>
          {pathname === '/main-table' && <div className="h-[1.5px] w-full bg-blue-900 mt-1" />}
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <Link href="/kanban" className="flex flex-row items-center justify-center gap-2 text-white">
            <Album className="h-5 w-5" />
            Kanban Board
          </Link>
          {pathname === '/kanban' && <div className="h-[1.5px] w-full bg-blue-900 mt-1" />}
        </div>
      </div>
    </div>
  );
}
