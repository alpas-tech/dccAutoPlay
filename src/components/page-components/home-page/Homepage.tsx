// components/MiddleSection.tsx
'use client';
import DocumentBtn from './document/DocumentBtn';
import EmployeeList from './employee-list/EmployeeList';
import ServiceList from './service-list/ServiceList';

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col h-[81vh] 2xl:h-[86vh] p-4 text-white">
        <div className="flex-1 grid lg:grid-cols-4 grid-cols-1 gap-4 overflow-auto min-h-0">
          <ServiceList />
          <EmployeeList />
        </div>
      </div>
      <DocumentBtn />
    </>
  );
};

export default Homepage;
