'use client';

import { useSession } from 'next-auth/react';
import { useGetUserInformationQuery } from 'src/redux/slices/currentUserSlice';

const GetInitialUserInformation = () => {
  const { data: session } = useSession();
  useGetUserInformationQuery(session?.user.id, {
    skip: !Boolean(session?.user.id)
  });

  return null;
};

export default GetInitialUserInformation;
