'use client';

import useGetCurrentUserInformation from '@share/hooks/useGetCurrentUserInformation';
import { currentUserInformationDataAtom } from '@share/states';
import { User } from 'next-auth';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const GetInitialUserInformation = ({ user }: { user?: User }) => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const { fetchApi } = useGetCurrentUserInformation();

  useEffect(() => {
    if (user?.id && user?.id !== currentUserInformation?.alumniId) {
      fetchApi({ id: user.id });
    }
  }, []);

  return null;
};

export default GetInitialUserInformation;
