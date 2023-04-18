import useApi from 'src/modules/share/hooks/useApi';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const useSetPassword = () => {
  const { fetchApi, data, isLoading } = useApi<
    unknown,
    { data: { email: string } },
    AxiosError
  >(
    'sign-up',
    (values: any) => ({
      method: 'PUT',
      url: '/platformHost/api/set_password',
      data: values,
    }),
    {
      revalidate: false,
      rollbackOnError: false,
      // onSuccess: () => router.push('/sign_in'),
      onError: (err: AxiosError) => {
        toast.error('Xảy ra lỗi, vui lòng thử lại sau ít phút');
      },
    },
  );

  return {
    isLoading,
    setPassword: fetchApi,
  };
};

export default useSetPassword;
