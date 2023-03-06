'use client';

import { Box, Typography, useTheme } from '@mui/material';

import useUpdateTenantById from '../hooks/useUpdateTenantById';
import EditSChoolForm, { EditSChoolFormValues } from './EditSchoolForm';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import LoadingIndicator from '@share/components/LoadingIndicator';

const EditSchoolPage = () => {
  const theme = useTheme();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

  const { updateTenantById } = useUpdateTenantById();

  const onUpdate = async (values: EditSChoolFormValues) => {
    await updateTenantById({ id: currentTenant.id, ...values });
  };

  if (!currentTenant.id) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          Thông tin của trường
        </Typography>
      </Box>

      <EditSChoolForm initialData={currentTenant} onSubmit={onUpdate} />
    </Box>
  );
};

export default EditSchoolPage;
