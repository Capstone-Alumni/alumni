'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import useGetUserInformationById from 'src/modules/profiles/hooks/useGetUserInformationById';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    data,
    isLoading,
  } = useGetUserInformationById("cld94ggjf0000zn1sncthmknq");

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        Init login by Gmail
      </div>
      {!session && (
        <a href="/sign_in" style={{ backgroundColor: 'green' }}>
          Login by Gmail
        </a>
      )}
      {session && (
        <>
          <p className="text-zinc-500">Hello {session?.user?.name}</p>
          <button onClick={() => router.push(`/profile/${session?.user?.id}`)
          }>Profile</button>
          <button onClick={() => signOut()} style={{ backgroundColor: 'red' }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
