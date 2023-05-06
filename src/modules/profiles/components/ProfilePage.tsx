'use client';

import ProfileSidebar from './ProfileSidebar';
import ProfileInformationTab from './information/ProfileInformationTab';
import { Box, Stack } from '@mui/material';
import ProfileCareerTab from './career/ProfileCareerTab';
import ProfileEducationTab from './education/ProfileEducationTab';
import ProfileGradeClassTab from './gradeClass/ProfileGradeClassTab';
import { useState } from 'react';
import CurrentGradeClassSection from './gradeClass/CurrentGradeClassSection';
import { useCanEditProfile } from '../helpers/canEditProfile';
import { useGetUserInformationQuery } from '@redux/slices/userProfileSlice';

const UserProfile = () => {
  const [currentTab, setCurrentTab] = useState('information');
  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab);
  };
  const { userProfileId } = useCanEditProfile();
  const userInformationResponse = useGetUserInformationQuery(userProfileId);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <ProfileSidebar onChangeTab={handleChangeTab} />

      <Box sx={{ width: '100%' }}>
        <Stack gap={2}>
          {currentTab === 'information' ? (
            <>
              <ProfileInformationTab />
              <CurrentGradeClassSection
                userInformation={userInformationResponse?.data?.data}
              />
              <ProfileCareerTab />
              <ProfileEducationTab />
            </>
          ) : (
            <ProfileGradeClassTab />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default UserProfile;
