import { useMutation, useQueryClient } from 'react-query';
import jsonApi from '../axios/jsonApi';
import multipartApi from '../axios/multipartApi';

const useApiMutation = (endpoint: string, queryKey?: string[]) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({
      data,
      onSuccessCallback,
      onErrorCallback,
      isMultipart = false,
      isPatch = false,
      isEditing = false,
      isDelete,
    }: {
      data?: any;
      onSuccessCallback?: (res: any) => void;
      onErrorCallback?: (err: any) => void;
      isEditing?: boolean;
      isMultipart?: boolean;
      isPatch?: boolean;
      isDelete?: boolean;
    }) => {
      try {
        if (isDelete) {
          const response = await jsonApi.delete(endpoint);
          onSuccessCallback?.(response);
          return response;
        }

        if (isMultipart) {
          const response = isPatch
            ? await multipartApi.patch(endpoint, data)
            : isEditing
            ? await multipartApi.put(endpoint, data)
            : await multipartApi.post(endpoint, data);

          onSuccessCallback?.(response);
          return response;
        } else {
          const response = isPatch
            ? await jsonApi.patch(endpoint, data)
            : isEditing
            ? await jsonApi.put(endpoint, data)
            : await jsonApi.post(endpoint, data);

          onSuccessCallback?.(response);
          return response;
        }
      } catch (error: any) {
        onErrorCallback?.(error.response?.data || error);
        throw error; // <-- important: rethrow so React Query triggers `onError`
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey ?? endpoint);
      },
      onError: (error, variables) => {
        // react-query's error lifecycle still works
        console.error(`Mutation failed at endpoint: ${endpoint}`, error);
        variables?.onErrorCallback?.(error);
      },
    }
  );

  return mutation;
};

export default useApiMutation;
