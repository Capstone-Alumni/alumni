'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import AdminNewsCards from './AdminNewsCards';
import data from '../__mockData__/getNewsListForSchoolAdmin';
import { noop } from 'lodash';

const AdminNewsListPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const navigateToNewsForm = () => {
    router.replace('/admin/news/form');
  };

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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Tin tức</Typography>
        <Button
          onClick={navigateToNewsForm}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Thêm tin tức
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {data.status ? (
          <AdminNewsCards
            data={data.data}
            onEdit={noop}
            onChangePage={noop}
            onDelete={noop}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminNewsListPage;
