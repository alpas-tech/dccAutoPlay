import Image from 'next/image';

const EmployeeCard = ({ employee }: { employee: any }) => {
  return (
    <div className="flex w-11/12 bg-primary-blue rounded-md shadow-md overflow-hidden">
      {/* Left side - Image */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40">
        <Image
          key={employee.id || employee.image_url} // 🔑 force rerender
          src={employee.image_url}
          alt={employee.name}
          width={70}
          height={70}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Details */}
      <div className="flex flex-col justify-center p-4 text-white">
        <p className="font-bold text-2xl">{employee.name}</p>
        {employee.designation?.title && <p className="text-sm 2xl:text-xl">पद: {employee.designation?.title}</p>}
        {employee.phone && <p className="text-sm 2xl:text-xl">फोन: {employee.phone}</p>}
        {employee.email && <p className="text-sm 2xl:text-xl">इमेल: {employee.email}</p>}
        {employee.room_number && <p className="text-sm 2xl:text-xl">कोठा नं.: {employee.room_number}</p>}
      </div>
    </div>
  );
};

export default EmployeeCard;
