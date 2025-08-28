'use client';
import Footer from '@/components/shared-components/master-Layout/footer/Footer';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Navbar = dynamic(() => import('@/components/shared-components/master-Layout/navbar/Navbar'), { ssr: false });

const MasterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 nepali pt-22 2xl:pt-32 bg-gradient-to-b from-[#0b2b48] to-[#123a5f]">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MasterLayout;
