import { useRouter } from 'next/navigation';

import useApi from 'src/modules/share/hooks/useApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const useForgotPassword = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi<
    unknown,
    { data: { email: string; tenantId: string } },
    AxiosError
  >(
    'forgot-password',
    (values: any) => ({
      method: 'POST',
      url: '/platformHost/api/forgot_password',
      data: {
        accountEmail: values.email,
        tenantId: values.tenantId,
      },
    }),
    {
      revalidate: false,
      rollbackOnError: false,
      onError: (err: AxiosError) => {
        toast.error('Xảy ra lỗi, vui lòng thử lại sau ít phút');
      },
      onSuccess: () => {
        toast.success(
          'Một email gửi đường dẫn đổi mật khẩu đã được gửi tới mail của bạn. Vui lòng kiểm tra.',
        );
        router.push('/');
      },
    },
  );

  return {
    isLoading,
    forgotPassword: fetchApi,
  };
};

export default useForgotPassword;
