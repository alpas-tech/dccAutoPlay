import Image from 'next/image';

const EmployeeCard = ({ employee }: { employee: any }) => {
  return (
    <div className="flex w-11/12 max-w-4xl bg-primary-blue rounded-xl shadow-md overflow-hidden">
      <div className="flex-shrink-0 w-24 h-24 sm:w-40 sm:h-40 rounded-xl">
        <Image
          key={employee.id || employee.image_url}
          src={employee.image_url}
          alt={employee.name}
          width={160}
          height={160}
          className="object-cover w-full h-full rounded-xl"
          priority
        />
      </div>

      <div className="flex flex-col justify-center p-4 text-white flex-1 text-[clamp(0.75rem,0.6vw+0.6rem,1.25rem)]">
        <p className="font-bold text-3xl leading-snug">{employee.name}</p>

        {employee.designation?.title && <p>पद: {employee.designation?.title}</p>}
        {employee.phone && <p>फोन: {employee.phone}</p>}
        {employee.email && <p>इमेल: {employee.email}</p>}
        {employee.room_number && <p>कोठा नं.: {employee.room_number}</p>}
      </div>
    </div>
  );
};

export default EmployeeCard;
