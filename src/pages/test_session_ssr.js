import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { nextAuthOptions } from './api/auth/[...nextauth]';

export default function Comp({ session }) {
  return <div>test session</div>;
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    nextAuthOptions,
  );

  console.log(session);

  return {
    props: {
      session: session,
    }, // will be passed to the page component as props
  };
}
