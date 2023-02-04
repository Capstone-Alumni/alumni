'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import AdminNewsCards from './AdminNewsCards';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useGetNewsForSchoolAdminQuery } from 'src/redux/slices/newsSlice';
import { useState } from 'react';

const AdminNewsListPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const [params, setParams] = useState({
    page: 1,
    limit: 3,
    title: '',
    content: '',
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setParams({
      ...params,
      page: value,
    });
  };

  const { data: newsListData, isLoading } = useGetNewsForSchoolAdminQuery({
    params,
  });

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
      {isLoading ? <LoadingIndicator /> : null}
      {newsListData ? (
        <Box
          sx={{
            width: '100%',
          }}
        >
          <AdminNewsCards
            data={newsListData.data}
            page={params.page}
            onChange={handleChange}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default AdminNewsListPage;
