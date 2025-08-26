import Image from 'next/image';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="flex w-11/12 bg-primary-blue rounded-md shadow-md overflow-hidden">
      {/* Left side - Image */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40">
        <Image
          src={employee.image_url}
          alt={employee.name}
          width={70}
          height={70}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Details */}
      <div className="flex flex-col justify-center p-4 text-white">
        <p className="font-bold text-xl">{employee.name}</p>
        <p className="text-sm">Designation: {employee.designation?.title}</p>
        <p className="text-sm">Phone: {employee.phone}</p>
        {employee.email && <p className="text-sm">Email: {employee.email}</p>}
        {employee.room_number && <p className="text-sm">Room: {employee.room_number}</p>}
        <p className="text-sm">Status: {employee.status === '1' ? 'Active' : 'Inactive'}</p>
        <p className="text-xs mt-1">Updated at: {new Date(employee.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
