import { Stack } from '@mui/material';
import React from 'react';
import CurrentGradeClassSection from './CurrentGradeClassSection';
import { useCanEditProfile } from '../../helpers/canEditProfile';
import RequestJoinClassSection from './RequestJoinClassSection';

const ProfileGradeClassTab = () => {
  const { canEditProfile } = useCanEditProfile();

  return (
    <Stack direction="column" gap={4}>
      <CurrentGradeClassSection />

      {canEditProfile ? <RequestJoinClassSection /> : null}
    </Stack>
  );
};

export default ProfileGradeClassTab;
