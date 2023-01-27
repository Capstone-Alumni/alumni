'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import useGetUserInformationById from 'src/modules/profiles/hooks/useGetUserInformationById';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        Init login by Gmail
      </div>
      {session && (
        <>
          <button onClick={() => router.push(`/profile/${session?.user?.id}`)
          }>Profile</button>
        </>
      )}
    </div>
  );
};

export default Home;
