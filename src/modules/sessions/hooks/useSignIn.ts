import { useRouter } from 'next/navigation';
import { signIn as nextSignIn } from 'next-auth/react';
import { SignInFormValues } from '../components/SignInForm';
import { useAppSelector } from 'src/redux/hooks';
import { currentTenantSubdomainSelector } from 'src/redux/slices/currentTenantSlice';

export default function useSignIn() {
  const router = useRouter();
  const subdomain = useAppSelector(currentTenantSubdomainSelector);

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
            router.replace('/home');
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
