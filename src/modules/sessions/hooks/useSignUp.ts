import { useRouter } from 'next/navigation';

import useApi from 'src/modules/share/hooks/useApi';

import { SignUpFormPayload, SignUpFormValues } from '../types';

const useSignUp = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi(
    'sign-up',
    (values: SignUpFormPayload & { tenantId: string }) => ({
      method: 'POST',
      url: '/platformHost/api/signup',
      data: values,
    }),
    {
      revalidate: false,
      rollbackOnError: false,
      // TODO: add notification onError
      onSuccess: () => router.push('/sign_in'),
    },
  );

  const signUp = async ({
    username,
    email,
    password,
    tenantId,
  }: SignUpFormValues & { tenantId: string }) => {
    const payload = {
      username,
      email,
      password,
      tenantId,
    };

    await fetchApi(payload);
  };

  return {
    isLoading,
    signUp,
  };
};

export default useSignUp;
