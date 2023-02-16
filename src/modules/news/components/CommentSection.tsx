'use client';

import { Box } from '@mui/material';
import NewsCommentList from './NewsCommentList';
import NewsCommentInput from './NewsCommentInput';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const CommentSection = () => {
  const pathname = usePathname();
  const newsId = pathname?.split('/')[2] || '';
  const { data: session } = useSession();
  const { user } = session!;
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
