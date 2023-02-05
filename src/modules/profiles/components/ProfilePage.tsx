'use client';

import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

import { styled } from '@mui/material';
import { Box, Card, Container, Tab, Tabs } from '@mui/material';

import {
  Profile,
  ProfileCover,
} from '../../share/components/_dashboard/user/profile';
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
  const [currentTab, setCurrentTab] = useState('profile');

  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf('/') + 1);

  const userInformationResponse = useGetUserInformationQuery(userProfileId);
  const userCareersResponse = useGetUserCareersQuery(userProfileId);
  const userEducationsResponse = useGetUserEducationsQuery(userProfileId);

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  if (!userProfileId) {
    redirect('/403_error');
  }

  if (
    userEducationsResponse?.error ||
    userCareersResponse?.error ||
    userInformationResponse?.error
  ) {
    redirect('/403_error');
  }

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Profile
          userProfileId={userProfileId}
          userInformation={userInformationResponse}
          userCareers={userCareersResponse}
          userEducations={userEducationsResponse}
        />
      ),
    },
  ];

  return userProfileId ? (
    <Container maxWidth={'lg'}>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}
      >
        <ProfileCover userProfileId={userProfileId} />

        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TABS.map(tab => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {PROFILE_TABS.map(tab => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  ) : (
    <></>
  );
};

export default UserProfile;
