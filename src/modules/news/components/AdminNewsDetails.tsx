'use client';

import { Box, Button, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from '@share/components/NextLinkV2';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useGetNewsByIdForSchoolAdminQuery,
  useUpdateNewsByIdMutation,
} from 'src/redux/slices/newsSlice';
import NewsCommentList from './NewsCommentList';
import NewsContentPage from './NewsContentPage';
import NewsForm from './NewsForm';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';

const AdminNewsDetails = () => {
  const pathname = usePathname();
  const newsId = pathname?.split('/')[4] || '';
  const { data: newsData, isLoading } =
    useGetNewsByIdForSchoolAdminQuery(newsId);
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);
  const [updateNewsPublic] = useUpdateNewsByIdMutation();
  const handlePublicNews = async (newsId: string, isNewsPublic: boolean) => {
    await updateNewsPublic({
      newsId,
      isPublic: !isNewsPublic,
    });
  };

  const [openEditForm, setOpenEditForm] = useState(false);
  return (
    <Box
      sx={{
        width: openEditForm ? '100%' : '80%',
        margin: 'auto',
      }}
    >
      {!openEditForm && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href="/admin/action/news">
            <Typography>Danh sách tin tức</Typography>
          </Link>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Button
              sx={{
                mr: 1,
              }}
              variant="outlined"
              onClick={() => setOpenEditForm(true)}
            >
              Chỉnh sửa bài viết
            </Button>
            {newsData && newsData.status ? (
              <Button
                sx={{
                  marginLeft: 'auto',
                  color: newsData.data.isPublic ? 'gray' : '',
                }}
                color={!newsData.data.isPublic ? 'secondary' : undefined}
                variant="outlined"
                onClick={() =>
                  handlePublicNews(newsData.data.id, newsData.data.isPublic)
                }
              >
                {newsData.data.isPublic ? (
                  <>
                    <PublicOffIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                      }}
                    />
                    Ẩn bài viết
                  </>
                ) : (
                  <>
                    <PublicIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                      }}
                    />
                    Công khai bài viết
                  </>
                )}
              </Button>
            ) : null}
          </Box>
        </Box>
      )}
      {openEditForm && <NewsForm initialData={newsData.data} />}
      {isLoading && !openEditForm ? <LoadingIndicator /> : null}
      {newsData && !openEditForm ? (
        <NewsContentPage data={newsData.data} />
      ) : null}
      <NewsCommentList user={user} newsId={newsId} />
    </Box>
  );
};

export default AdminNewsDetails;
