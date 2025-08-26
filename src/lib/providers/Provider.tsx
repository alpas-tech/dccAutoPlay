'use client';
import React from 'react';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalContext } from '../useContext/useGlobalContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext>{children}</GlobalContext>
      {/* <ToastContainer /> */}
    </QueryClientProvider>
  );
};

export default Providers;
