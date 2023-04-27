import { useRouter } from 'next/navigation';

import useApi from 'src/modules/share/hooks/useApi';

import { SignUpFormPayload } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const useSignUp = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi(
    'sign-up',
    (values: SignUpFormPayload) => ({
      method: 'POST',
      url: '/api/signup',
      data: values,
    }),
    {
      revalidate: false,
      rollbackOnError: false,
      // onSuccess: () => router.push('/sign_in'),
      onError: (err: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const msg = err.response?.data?.message;
        if (msg.includes('invalid')) {
          toast.error('Thông tin không hợp lệ');
        } else if (msg.includes('existed')) {
          toast.error('Tài khoản đã tồn tại');
        } else {
          toast.error('Xảy ra lỗi, vui lòng thử lại sau ít phút');
        }
      },
      onSuccess: () => {
        router.push('/register_success');
        // toast.success(
        //   'Đăng ký thành công. Vui lòng chờ ban quản lý xét duyệt thông tin của bạn',
        // );
      },
    },
  );

  return {
    isLoading,
    signUp: fetchApi,
  };
};

export default useSignUp;
