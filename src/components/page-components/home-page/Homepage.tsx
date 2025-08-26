// components/MiddleSection.tsx
'use client';
import { useState } from 'react';
import EmployeeList from './employee-list/EmployeeList';
import ServiceList from './service-list/ServiceList';

const notices = [
  'सोमबार कार्यालय समय बिहान 10:00 देखि सुरु हुनेछ',
  'मंगलबार विशेष कार्यक्रम हुने छ',
  'नागरिकता वितरण प्रक्रिया सुरु भएको छ',
];

const Homepage = () => {
  const [noticeIndex, setNoticeIndex] = useState(0);

  return (
    <>
      <div className="flex flex-col h-[80vh] p-4 text-white">
        <div className="flex-1 grid grid-cols-4 gap-4 overflow-auto">
          <ServiceList />
          <EmployeeList />
        </div>
      </div>
      {/* Notices + Stage */}
      <section className="bg-red-700 h-12 flex items-center px-4 overflow-hidden relative">
        <div className="whitespace-nowrap text-white font-medium text-sm sm:text-2xl">
          <span>सुचना</span>
          <span className="mx-2">|</span>
          <span>{notices[noticeIndex]}</span>
        </div>
      </section>
    </>
  );
};

export default Homepage;
