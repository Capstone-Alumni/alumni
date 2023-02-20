'use client';

import { styled } from '@mui/material';
import { Box, Container } from '@mui/material';

import { Profile } from '../../share/components/_dashboard/user/profile';
import { redirect, usePathname } from 'next/navigation';
import {
  useGetUserCareersQuery,
  useGetUserEducationsQuery,
  useGetUserInformationQuery,
} from 'src/redux/slices/userProfileSlice';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

const UserProfile = () => {
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  const userInformationResponse = useGetUserInformationQuery(userProfileId);
  const userCareersResponse = useGetUserCareersQuery(userProfileId);
  const userEducationsResponse = useGetUserEducationsQuery(userProfileId);

  if (!userProfileId) {
    redirect('/403_error');
  }

  return userProfileId ? (
    <Container maxWidth={'lg'}>
      {/* <Box> */}
      <Profile
        userProfileId={userProfileId}
        userInformation={userInformationResponse}
        userCareers={userCareersResponse}
        userEducations={userEducationsResponse}
      />
      {/* </Box> */}
    </Container>
  ) : (
    <></>
  );
};

export default UserProfile;
