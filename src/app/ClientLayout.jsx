'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header/Header';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // ✅ Hide header for story/[id] pages
  const hideHeader = pathname.startsWith('/stories/');

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}