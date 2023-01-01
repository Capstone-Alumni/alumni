import { useRouter } from 'next/navigation';

import useApi from 'src/modules/share/hooks/useApi';

import { SignUpFormPayload, SignUpFormValues } from '../types';

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
      // TODO: add notification onError
      onSuccess: () => router.push('/sign_in'),
    },
  );

  const signUp = async ({ username, email, password }: SignUpFormValues) => {
    const payload = {
      username,
      email,
      password,
    };

    await fetchApi(payload);
  };

  return {
    isLoading,
    signUp,
  };
};

export default useSignUp;
