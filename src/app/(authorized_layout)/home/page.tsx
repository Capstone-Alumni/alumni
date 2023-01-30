'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import useGetUserInformationById from 'src/modules/profiles/hooks/useGetUserInformationById';

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        Init login by Gmail
      </div>
      {session && (

        <>
          <Link
            href={{
              pathname: `/profile/${session?.user?.id}`
            }}
          >
            Profile
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
