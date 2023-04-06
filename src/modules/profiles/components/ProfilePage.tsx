'use client';

import ProfileSidebar from './ProfileSidebar';
import ProfileInformationTab from './information/ProfileInformationTab';
import { Box, Stack } from '@mui/material';
import ProfileCareerTab from './career/ProfileCareerTab';
import ProfileEducationTab from './education/ProfileEducationTab';

const UserProfile = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <ProfileSidebar />

      <Box sx={{ width: '100%' }}>
        <Stack gap={2}>
          <ProfileInformationTab />
          <ProfileCareerTab />
          <ProfileEducationTab />
        </Stack>
      </Box>
    </div>
  );
};

export default UserProfile;
