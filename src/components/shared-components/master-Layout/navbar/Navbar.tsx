'use client';
import { nepaliDateAndTime } from '@/helpers/Helpers';
import NepalFlag from '@/images/NepalFlag.gif';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { loginSuccess, loginData } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  const { nepaliFormattedDate, nepaliFormattedDay, nepaliFormattedTime } = nepaliDateAndTime();

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  const userData = loginData?.data?.data?.user;
  const headerImage = userData?.image;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full background-blue-header shadow-md">
      {/* Main header */}
      <div className={`h-20 2xl:h-32 px-6 flex items-center ${headerImage ? 'justify-between' : 'justify-end'}`}>
        {/* Logo */}
        {headerImage && (
          <section className="flex gap-2 items-center">
            <Image
              src={headerImage}
              width={80}
              height={80}
              alt="Nepal government"
              className="object-contain w-12 h-12 sm:w-[65px] sm:h-[65px] 2xl:w-28 2xl:h-28"
            />
            <div className="flex flex-col text-lg 2xl:text-3xl">
              <span className="font-semibold text-white leading-snug">{userData?.name}</span>
              <span className="font-semibold text-white leading-snug">{userData?.address}</span>
            </div>
          </section>
        )}

        {/* Title - absolutely centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none ">
          <h1 className="text-xl sm:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-white leading-snug">
            नागरिक वडापत्र
          </h1>
        </div>

        {/* Flag */}
        <div className="flex">
          <section className="flex flex-col items-end text-right justify-center text-white mr-2 mt-2 2xl:text-3xl">
            <p>
              {nepaliFormattedDay}, {nepaliFormattedDate}
            </p>
            <p>{nepaliFormattedTime}</p>
          </section>
          <Image
            src={NepalFlag}
            width={65}
            height={65}
            alt="Nepal flag"
            className="object-contain w-12 h-12 sm:w-[65px] sm:h-[65px] 2xl:w-28 2xl:h-28"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
