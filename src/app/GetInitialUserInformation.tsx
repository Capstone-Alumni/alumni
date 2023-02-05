'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getCurrentUserInfo } from 'src/redux/slices/currentUserSlice';

const GetInitialUserInformation = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.id) return;
    getCurrentUser(session?.user.id);
  }, [session]);

  const getCurrentUser = async (id: string) => {
    await getCurrentUserInfo(id);
  };

  return null;
};

export default GetInitialUserInformation;
