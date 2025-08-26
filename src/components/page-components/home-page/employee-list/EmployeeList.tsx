'use client';
import { useApiQuery } from '@/lib/react-query/useReactQuery';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import { useEffect, useState } from 'react';
import EmployeeCard from './employee-card/EmployeeCard';

const EmployeeList = () => {
  const { loginSuccess } = useGlobalContext();
  const {
    data: EmployeeList,
    error: EmployeeError,
    isLoading: EmployeeIsLoading,
  } = useApiQuery({
    axiosOptions: {},
    enabled: loginSuccess,
    queryKey: ['employees-list'],
    endpoint: '/employees',
  });

  const employees = EmployeeList?.data?.employees || [];

  // Group by category
  const employeesByCategory = employees.reduce((acc: any, emp: any) => {
    const categoryTitle = emp.category?.title || 'अन्य';
    if (!acc[categoryTitle]) acc[categoryTitle] = [];
    acc[categoryTitle].push(emp);
    return acc;
  }, {});

  // Track current employee index per category
  const initialIndex = Object.keys(employeesByCategory).reduce((acc: any, cat) => {
    acc[cat] = 0;
    return acc;
  }, {});
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>(initialIndex);

  useEffect(() => {
    const intervalIds: NodeJS.Timer[] = [];

    Object.keys(employeesByCategory).forEach((category) => {
      const id = setInterval(() => {
        setCurrentIndex((prev) => ({
          ...prev,
          [category]: (prev[category] + 1) % employeesByCategory[category].length,
        }));
      }, 100);
      intervalIds.push(id);
    });

    return () => intervalIds.forEach(clearInterval);
  }, [employeesByCategory]);

  // ✅ branch after hooks
  if (EmployeeIsLoading) {
    return <div>Loading...</div>;
  }

  if (EmployeeError) {
    return <div>Error loading employees</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 no-scrollbar">
      {Object.entries(employeesByCategory).map(([category, emps]) => {
        const index = currentIndex[category] || 0;
        const employee = emps[index];

        return (
          <div key={category} className="primary-blue rounded-xl shadow-md flex flex-col items-center h-auto">
            <h2 className="text-xl font-bold mb-2 bg-green-700 w-full py-2 text-center rounded-t-xl">{category}</h2>

            {employee ? <EmployeeCard employee={employee} /> : <p>No employees</p>}
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;
