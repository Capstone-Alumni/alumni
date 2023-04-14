'use client';

import { Box } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetNewsByIdForSchoolAdminQuery } from 'src/redux/slices/newsSlice';
import NewsCommentList from './NewsCommentList';
import NewsForm from './NewsForm';

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

  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
      }}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <NewsForm initialData={newsData.data} />
          <NewsCommentList user={user} newsId={newsId} />
        </>
      )}
    </Box>
  );
};

export default AdminNewsDetails;
