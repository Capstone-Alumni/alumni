import { useRouter } from 'next/navigation';
import { signIn as nextSignIn } from 'next-auth/react';
import { SignInFormValues } from '../components/SignInForm';

export default function useSignIn() {
  const router = useRouter();

  const signIn = (
    provider: 'credentials' | 'google' | 'facebook',
    value?: SignInFormValues,
  ) => {
    switch (provider) {
      case 'google':
        return nextSignIn('google', {
          callbackUrl: '/verify_account',
        });
      case 'facebook':
        return nextSignIn('facebook', {
          callbackUrl: '/verify_account',
        });
      case 'credentials':
        return nextSignIn('credentials', {
          usernameOrEmail: value?.usernameOrEmail,
          password: value?.password,
          redirect: false,
        }).then(res => {
          if (res?.error) {
            // TODO: handle error
          } else {
            router.replace('/verify_account');
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
