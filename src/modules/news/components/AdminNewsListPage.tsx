'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingIndicator from '@share/components/LoadingIndicator';
import {
  useDeleteNewsMutation,
  useGetNewsForSchoolAdminQuery,
  useUpdateNewsByIdMutation,
} from 'src/redux/slices/newsSlice';
import { useState } from 'react';
import Link from 'next/link';
import AdminNewsListTable from './AdminNewsListTable';

const AdminNewsListPage = () => {
  const theme = useTheme();

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    title: '',
    content: '',
  });
  const [updateNewsPublic] = useUpdateNewsByIdMutation();

  const [deleteNews] = useDeleteNewsMutation();

  const handlePublicNews = async (newsId: string, isNewsPublic: boolean) => {
    await updateNewsPublic({
      newsId,
      isPublic: !isNewsPublic,
    });
  };
  const handleChange = (value: number) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const handleDeleteNews = async (newsId: string) => {
    await deleteNews({
      newsId,
    });
  };

  const { data: newsListData, isLoading } = useGetNewsForSchoolAdminQuery({
    params,
  });

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
        <Link href="/admin/action/news/form" prefetch={false}>
          <Button role="href" variant="contained" startIcon={<AddIcon />}>
            Thêm tin tức
          </Button>
        </Link>
      </Box>

      {isLoading ? <LoadingIndicator /> : null}

      {newsListData ? (
        // <Box
        //   sx={{
        //     width: '100%',
        //   }}
        // >
        //   <AdminNewsCards
        //     data={newsListData.data}
        //     page={params.page}
        //     onChange={handleChange}
        //   />
        // </Box>
        <AdminNewsListTable
          data={newsListData.data}
          page={params.page}
          onChangePage={handleChange}
          onPublic={handlePublicNews}
          onDelete={handleDeleteNews}
        />
      ) : null}
    </Box>
  );
};

export default AdminNewsListPage;
