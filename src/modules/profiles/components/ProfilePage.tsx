'use client';

import ProfileSidebar from './ProfileSidebar';
import ProfileInformationTab from './information/ProfileInformationTab';
import { Box, Stack } from '@mui/material';
import ProfileCareerTab from './career/ProfileCareerTab';
import ProfileEducationTab from './education/ProfileEducationTab';
import { useSearchParams } from 'next/navigation';

const UserProfile = () => {
  const searchParams = useSearchParams();
  const currentProfileTab = searchParams.get('profile_tab');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <ProfileSidebar />

      <Box sx={{ width: '100%' }}>
        {currentProfileTab === 'information' ? (
          <Stack gap={2}>
            <ProfileInformationTab />
            <ProfileCareerTab />
            <ProfileEducationTab />
          </Stack>
        ) : null}
      </Box>
    </div>
  );
};

export default UserProfile;
