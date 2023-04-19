'use client';

import { Alumni, currentUserInformationDataAtom } from '@share/states';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const GetInitialUserInformation = ({ user }: { user?: Alumni }) => {
  const [currentUserInformation, setCurrentUserInformation] = useRecoilState(
    currentUserInformationDataAtom,
  );

  useEffect(() => {
    if (user) {
      setCurrentUserInformation(user);
    }
  }, []);

  return null;
};

export default GetInitialUserInformation;
