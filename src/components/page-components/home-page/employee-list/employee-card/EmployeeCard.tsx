import Image from 'next/image';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="flex flex-col items-center gap-3 py-2 rounded-md primary-blue w-11/12 text-center">
      <Image src={employee.image_url} alt={employee.name} width={80} height={80} className="rounded-full" />
      <p className="font-semibold text-lg">{employee.name}</p>
      <p>Designation: {employee.designation?.title}</p>
      <p>Phone: {employee.phone}</p>
      {employee.email && <p>Email: {employee.email}</p>}
      {employee.room_number && <p>Room: {employee.room_number}</p>}
      <p>Status: {employee.status === '1' ? 'Active' : 'Inactive'}</p>
      <p>Updated at: {new Date(employee.updated_at).toLocaleString()}</p>
    </div>
  );
};

export default EmployeeCard;
