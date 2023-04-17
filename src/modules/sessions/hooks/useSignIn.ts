import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { signIn as nextSignIn } from 'next-auth/react';
import { SignInFormValues } from '../components/SignInForm';
import { currentTenantSubdomainSelector } from '@share/states';

export default function useSignIn() {
  const router = useRouter();
  const subdomain = useRecoilValue(currentTenantSubdomainSelector);

  const signIn = (provider: 'credentials', value?: SignInFormValues) => {
    switch (provider) {
      case 'credentials':
        return nextSignIn('credentials', {
          subdomain: subdomain,
          email: value?.email,
          password: value?.password,
          redirect: false,
        }).then(res => {
          if (res?.error) {
            // TODO: handle error
          } else {
            router.replace('/');
          }
        });
      default:
        // eslint-disable-next-line no-case-declarations
        const _exhaustedCheck: never = provider;
        return _exhaustedCheck;
    }
  };

  return { signIn };
}
