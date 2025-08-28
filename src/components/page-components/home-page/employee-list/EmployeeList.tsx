'use client';
import { useApiQuery } from '@/lib/react-query/useReactQuery';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import { useMemo } from 'react';
import CategoryGroup from './category-group/CategoryGroup';

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
  const employeesByCategory = useMemo(() => {
    return groupBy(employees, (emp: any) => emp.category?.title || 'अन्य');
  }, [employees]);

  if (EmployeeError) return <div>Error loading employees</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 no-scrollbar">
      {EmployeeIsLoading ? (
        <div className="primary-blue rounded-xl shadow-md flex flex-col items-center h-auto animate-pulse"></div>
      ) : (
        <>
          {Object.entries(employeesByCategory).map(([category, emps]) => (
            <CategoryGroup key={category} category={category} employees={emps} />
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeList;

// GroupBy function
function groupBy<T>(array: T[], keyFn: (item: T) => string) {
  return array.reduce((acc: Record<string, T[]>, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
