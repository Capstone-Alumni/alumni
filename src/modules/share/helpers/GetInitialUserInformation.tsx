'use client';

import LoadingIndicator from '@share/components/LoadingIndicator';
import {
  currentTenantDataAtom,
  currentUserInformationDataAtom,
} from '@share/states';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const GetInitialUserInformation = ({ children }: { children: JSX.Element }) => {
  const { data: session } = useSession();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

  const [currentUserInformation, setCurrentUserInformation] = useRecoilState(
    currentUserInformationDataAtom,
  );

  useEffect(() => {
    if (session?.user) {
      const url = `/api/users/${session.user.id}/information`;
      axios
        .get(url, { headers: { 'tenant-id': currentTenant.id } })
        .then(({ data }) => {
          setCurrentUserInformation(data.data);
          return data;
        })
        .catch(err => {
          console.log('catch fetch error', err);
        });
    }
  }, [session]);

  if (session?.user && !currentUserInformation) {
    return <LoadingIndicator />;
  }

  return children;
};

export default GetInitialUserInformation;
