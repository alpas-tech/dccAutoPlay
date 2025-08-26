// components/MiddleSection.tsx
'use client';
import EmployeeList from './employee-list/EmployeeList';
import NoticeText from './notice-text/NoticeText';
import ServiceList from './service-list/ServiceList';

const Homepage = () => {
  return (
    <>
      <div className="flex flex-col h-[80vh] 3xl:h-[88vh] p-4 text-white">
        <div className="flex-1 grid lg:grid-cols-4 grid-cols-1 gap-4 overflow-auto">
          <ServiceList />
          <EmployeeList />
        </div>
      </div>
      <NoticeText />
    </>
  );
};

export default Homepage;
