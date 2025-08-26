'use client';
import { useApiQuery } from '@/lib/react-query/useReactQuery';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import { useEffect, useMemo, useState } from 'react';
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

  // Group by category (memoized to avoid infinite effect loop)
  const employeesByCategory = useMemo(() => {
    return employees.reduce((acc: any, emp: any) => {
      const categoryTitle = emp.category?.title || 'अन्य';
      if (!acc[categoryTitle]) acc[categoryTitle] = [];
      acc[categoryTitle].push(emp);
      return acc;
    }, {});
  }, [employees]);

  // Track current index per category
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});

  // 🔹 Reset currentIndex when employeesByCategory changes
  useEffect(() => {
    const initialIndex = Object.keys(employeesByCategory).reduce((acc: any, cat) => {
      acc[cat] = 0;
      return acc;
    }, {});
    setCurrentIndex(initialIndex);
  }, [employeesByCategory]);

  // 🔹 Set up auto-rotation
  useEffect(() => {
    if (!employees || employees.length === 0) return;

    const intervalIds: ReturnType<typeof setInterval>[] = [];

    Object.keys(employeesByCategory).forEach((category) => {
      const empCount = employeesByCategory[category].length;

      if (empCount > 1) {
        const id = setInterval(() => {
          setCurrentIndex((prev) => ({
            ...prev,
            [category]: ((prev[category] ?? 0) + 1) % empCount,
          }));
        }, 10000); // rotate every 10s
        intervalIds.push(id);
      }
    });

    return () => intervalIds.forEach((id) => clearInterval(id));
  }, [employeesByCategory, employees.length]);

  // ✅ branch after hooks
  if (EmployeeIsLoading) return <div>Loading...</div>;
  if (EmployeeError) return <div>Error loading employees</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 no-scrollbar">
      {Object.entries(employeesByCategory).map(([category, emps]) => {
        const index = currentIndex[category] ?? 0; // safe fallback
        const employeesArr = emps as any[];
        // Get two consecutive employees, wrap if needed
        const first = employeesArr[index];
        const second = employeesArr.length > 1 ? employeesArr[(index + 1) % employeesArr.length] : null;

        return (
          <div key={category} className="primary-blue rounded-xl shadow-md flex flex-col items-center h-auto">
            <h2 className="text-xl font-bold mb-2 bg-[#15803d] w-full py-2 text-center rounded-t-xl">{category}</h2>
            <div className="flex flex-col gap-5 w-full items-center 3xl:mt-2">
              {first ? <EmployeeCard employee={first} /> : <p>No employees</p>}
              {second && <EmployeeCard employee={second} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;
