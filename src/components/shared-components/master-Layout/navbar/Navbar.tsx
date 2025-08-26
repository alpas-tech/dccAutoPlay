'use client';
import NepalFlag from '@/images/NepalFlag.gif';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { loginSuccess, loginData } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  const formattedDay = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const userData = loginData?.data?.data?.user;
  const headerImage = userData?.image;

  console.log(userData);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full background-blue-header shadow-md">
      {/* Main header */}
      <div className="h-20 px-6 flex items-center justify-between relative">
        {/* Logo */}
        {headerImage && (
          <section className="flex gap-2 items-center">
            <Image
              src={headerImage}
              width={80}
              height={80}
              alt="Nepal government"
              className="object-contain w-12 h-12 sm:w-[65px] sm:h-[65px]"
            />
            <div className="flex flex-col text-lg">
              <span className="font-semibold text-white leading-snug">{userData?.name}</span>
              <span className="font-semibold text-white leading-snug">{userData?.address}</span>
            </div>
          </section>
        )}

        {/* Title - absolutely centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none">
          <h1 className="text-xl sm:text-2xl font-semibold text-white leading-snug">नागरिक वडापत्र</h1>
        </div>

        {/* Flag */}
        <div className="flex">
          <section className="flex flex-col items-end text-right text-white mr-2 mt-2">
            <p>
              {formattedDay}, {formattedDate}
            </p>
            <p>{formattedTime}</p>
          </section>
          <Image
            src={NepalFlag}
            width={65}
            height={65}
            alt="Nepal flag"
            className="object-contain w-12 h-12 sm:w-[65px] sm:h-[65px]"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
