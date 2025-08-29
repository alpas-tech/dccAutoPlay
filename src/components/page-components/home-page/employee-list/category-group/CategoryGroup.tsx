'use client';
import { useEffect, useRef, useState } from 'react';
import EmployeeCard from '../employee-card/EmployeeCard';

interface CategoryGroupProps {
  category: string;
  employees: any[]; // your employee type
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ category, employees }) => {
  const headDesignations = ['वडा सचिव', 'वडा अध्यक्ष', 'अर्को प्रमुख']; // add more

  const head = employees.find((emp) => headDesignations.includes(emp.designation?.title));
  const rest = employees.filter((emp) => emp !== head);

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation for this group only
  useEffect(() => {
    if (rest.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rest.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [rest.length]);

  const rotating = rest.length > 0 ? rest[currentIndex] : null;

  return (
    <div className="primary-blue rounded-xl shadow-md flex flex-col items-center h-auto overflow-auto no-scrollbar">
      <h2 className="lg:text-xl text-sm font-bold mb-2 bg-[#15803d] w-full py-2 text-center rounded-t-xl 2xl:text-3xl">
        {category}
      </h2>
      <div className="flex flex-col gap-5 w-full items-center 2xl:mt-2 relative">
        {head ? <EmployeeCard employee={head} /> : <p>No head</p>}

        <div ref={containerRef} className="relative w-full flex justify-center">
          {rest.map((emp) => {
            const isVisible = emp === rotating;
            return (
              <div
                key={emp.id}
                className={`absolute top-0 left-0 w-full flex justify-center transition-opacity duration-700 ease-in-out ${
                  isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <EmployeeCard employee={emp} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryGroup;
