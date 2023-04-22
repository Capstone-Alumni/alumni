import SetupPassword from '../../modules/sessions/components/SetupPassword';
import { GetServerSideProps } from 'next';

export default function Page() {
  return <SetupPassword />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { token } = query;
    const url = `${process.env.NEXT_PUBLIC_PLATFORM_HOST}/api/precheck_token?token=${token}`;
    const res = await fetch(url).then(res => res.json());

    if (res?.data !== 'verified') {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
