'use client';
import { Box, Button, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useGetNewsByIdForSchoolAdminQuery } from 'src/redux/slices/newsSlice';
import NewsContentPage from './NewsContentPage';
import NewsForm from './NewsForm';

const AdminNewsDetails = () => {
  const pathname = usePathname();
  const newsId = pathname?.split('/')[3] || '';
  const { data: newsData, isLoading } =
    useGetNewsByIdForSchoolAdminQuery(newsId);

  const [openEditform, setOpenEditForm] = useState(false);
  return (
    <Box
      sx={{
        width: openEditform ? '100%' : '80%',
        margin: 'auto',
      }}
    >
      {!openEditform && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href="/admin/news">
            <Typography>Danh sách tin tức</Typography>
          </Link>
          <Button
            sx={{
              marginLeft: 'auto',
            }}
            variant="outlined"
            onClick={() => setOpenEditForm(true)}
          >
            Chỉnh sửa bài viết
          </Button>
        </Box>
      )}
      {openEditform && <NewsForm initialData={newsData.data} />}
      {isLoading && !openEditform ? <LoadingIndicator /> : null}
      {newsData && !openEditform ? (
        <NewsContentPage data={newsData.data} />
      ) : null}
    </Box>
  );
};

export default AdminNewsDetails;