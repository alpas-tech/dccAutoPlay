import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import { AxiosRequestConfig } from 'axios';

interface UseReactInfiniteQueryProps<TQueryFnData, TError = unknown> {
  endpoint?: string;
  axiosOptions?: AxiosRequestConfig;
  queryKey: (string | number | undefined)[];
  staleTime?: number;
  enabled?: boolean;
  cacheTime?: number;
  configs?: Partial<UseInfiniteQueryOptions<TQueryFnData, TError>>;
  hasNextPageCallBack: (
    lastPage: TQueryFnData,
    allPages: TQueryFnData[]
  ) => unknown;
  queryFn: ({
    pageParam,
    signal,
  }: {
    pageParam?: any;
    signal?: AbortSignal;
  }) => Promise<TQueryFnData>;
}

export const useReactInfiniteQuery = <TQueryFnData = any, TError = unknown>({
  endpoint,
  axiosOptions,
  queryKey,
  staleTime,
  enabled = true,
  cacheTime,
  configs = {},
  hasNextPageCallBack,
  queryFn,
}: UseReactInfiniteQueryProps<TQueryFnData, TError>) => {
  return useInfiniteQuery<TQueryFnData, TError>({
    queryKey,
    cacheTime: cacheTime ?? 10,
    keepPreviousData: false,
    getNextPageParam: (lastPage, allPages) =>
      hasNextPageCallBack(lastPage, allPages),
    queryFn,
    enabled,
    staleTime: staleTime ?? 10,
    ...configs,
  });
};
