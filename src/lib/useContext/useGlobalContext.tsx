'use client';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../getEnvs';
import useApiMutation from '../react-query/useReactMutation';
import { useApiQuery } from '../react-query/useReactQuery';

interface GlobalContextProps {
  selectedServiceId: number | null;
  setSelectedServiceId: any;
  serviceList: any;
  serviceIsLoading: boolean;
  serviceError: any;
  loginSuccess: boolean;
  loginData: any;
}

const GlobalContextProvider = createContext<GlobalContextProps>(undefined!);

export function GlobalContext({ children }: Readonly<PropsWithChildren>) {
  const { mutate, isLoading, error, data: loginData, isSuccess: loginSuccess } = useApiMutation('/login');

  useEffect(() => {
    const payload = {
      email: LOGIN_EMAIL,
      password: LOGIN_PASSWORD,
    };
    mutate({ data: { ...payload }, isMultipart: false });
  }, [mutate]);

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const {
    data: serviceList,
    error: serviceError,
    isLoading: serviceIsLoading,
  } = useApiQuery({
    axiosOptions: {},
    enabled: loginSuccess,
    queryKey: ['service-list'],
    endpoint: '/services',
  });

  const contextValue: GlobalContextProps = {
    selectedServiceId,
    setSelectedServiceId,
    serviceList,
    serviceIsLoading,
    serviceError,
    loginSuccess,
    loginData,
  };

  return <GlobalContextProvider.Provider value={contextValue}>{children}</GlobalContextProvider.Provider>;
}

export function useGlobalContext(): GlobalContextProps {
  const context = useContext(GlobalContextProvider);

  if (typeof context === 'undefined') {
    throw new Error('useGlobalContext should be used within the GlobalContextProvider provider!');
  }
  return context;
}
