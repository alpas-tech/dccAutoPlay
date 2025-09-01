'use client';

import EmployeeList from '@/components/page-components/home-page/employee-list/EmployeeList';
import ServiceList from '@/components/page-components/home-page/service-list/ServiceList';

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col lg:h-[calc(100vh-12rem)] h-[calc(100vh-4rem)] p-4 text-white">
        <div className="flex-1 grid lg:grid-cols-4 grid-cols-1 gap-4 overflow-auto min-h-0">
          <ServiceList />
          <EmployeeList />
        </div>
      </div>
      {/* <NepaliTTS /> */}
      {/* <DocumentBtn /> */}
    </>
  );
};

export default Homepage;
