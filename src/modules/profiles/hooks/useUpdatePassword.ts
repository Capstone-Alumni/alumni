import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type UpdatePasswordParams = {
  userId: string;
  password: string;
  newPassword: string;
};
type UpdatePasswordResponse = unknown;

type UpdatePasswordError = AxiosError;

const useUpdatePassword = () => {
  const router = useRouter();

  const { fetchApi, isLoading, error, data } = useApi<
    UpdatePasswordParams,
    UpdatePasswordResponse,
    UpdatePasswordError
  >(
    'updatePassword',
    ({ userId, password, newPassword }) => ({
      method: 'POST',
      url: '/api/update_password',
      data: { userId, password, newPassword },
    }),
    {
      onError: () => {
        toast.error('Đổi mật khẩu thất bại. Vui lòng thử lại!');
      },
      onSuccess: () => {
        toast.success('Đổi mật khẩu thành công!');
        // router.push('/Jobs/hosting');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
    data,
  };
};

export default useUpdatePassword;
