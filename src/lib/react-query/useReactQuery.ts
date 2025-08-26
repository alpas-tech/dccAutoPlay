import { useQuery } from 'react-query';
import jsonApi from '../axios/jsonApi';

export const useApiQuery = ({
  endpoint,
  queryKey,
  staleTime,
  axiosOptions,
  enabled = true,
  cacheTime,
  configs = {},
  refetchInterval,
}: {
  endpoint: string;
  axiosOptions: {};
  queryKey: string[];
  staleTime?: number;
  enabled?: boolean;
  cacheTime?: number;
  refetchInterval?: number | false | ((query) => number | false);
  configs?: {};
}) => {
  return useQuery({
    queryKey: queryKey,
    cacheTime: 10,
    keepPreviousData: false,
    queryFn: async ({ signal }) => {
      // Add signal for cancellation
      if (!endpoint) return null;

      try {
        const response = await jsonApi.get(endpoint, {
          ...axiosOptions,
          signal, // Pass abort signal
        });
        return response.data;
      } catch (error: any) {
        if (error?.response?.status === 404) {
          return { __notFound: true };
        }
        if (error?.response?.status === 400) {
          return { __notFound: true };
        }
        throw error;
      }
    },
    enabled: enabled,
    staleTime: staleTime ? staleTime : 10,
    refetchInterval,
    ...configs,
  });
};
