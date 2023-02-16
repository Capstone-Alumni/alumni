'use client';

import { Box } from '@mui/material';
import NewsCommentList from './NewsCommentList';
import NewsCommentInput from './NewsCommentInput';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from 'next-auth';

const CommentSection = () => {
  const pathname = usePathname();
  const newsId = pathname?.split('/')[2] || '';
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
        marginTop: 5,
      }}
    >
      <NewsCommentInput user={user} newsId={newsId} />
      <NewsCommentList user={user} newsId={newsId} />
    </Box>
  );
};

export default CommentSection;
