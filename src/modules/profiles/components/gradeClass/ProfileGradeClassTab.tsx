import { Stack } from '@mui/material';
import React from 'react';
import { useCanEditProfile } from '../../helpers/canEditProfile';

const ProfileGradeClassTab = () => {
  const { canEditProfile } = useCanEditProfile();

  return (
    <Stack direction="column" gap={4}>
      {/* <CurrentGradeClassSection /> */}

      {/* {canEditProfile ? <AddGradesAndClasses /> : null} */}
    </Stack>
  );
};

export default ProfileGradeClassTab;
