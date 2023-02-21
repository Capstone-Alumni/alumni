'use client';

import { CardContent, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useGetListNewsCommentQuery } from '@redux/slices/newsCommentSlice';
import LoadingIndicator from '@share/components/LoadingIndicator';
import React, { useState } from 'react';
import NewsCommentItem from './NewsCommentItem';

const NewsCommentList = ({ user, newsId }: { user?: any; newsId: string }) => {
  const [page, setPage] = useState(1);
  const [commentParams, setCommentParams] = useState({
    page: 1,
    limit: 5,
  });

  const { data: newsComment, isLoading } = useGetListNewsCommentQuery({
    newsId: newsId,
    params: commentParams,
  });

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setCommentParams({
      ...commentParams,
      page: page,
    });
  };

  return (
    <Box
      sx={{
        marginTop: 3,
      }}
    >
      <Typography variant="h5">Tất cả bình luận</Typography>

      {isLoading ? <LoadingIndicator /> : null}
      {newsComment ? (
        <>
          {newsComment.data.totalItems > 0 ? (
            <CardContent
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {newsComment.data.items.map((item: any) => (
                <NewsCommentItem
                  key={item.id}
                  item={item}
                  user={user}
                  newsId={newsId}
                />
              ))}
              <Pagination
                sx={{
                  margin: 'auto',
                  marginTop: 2,
                }}
                count={Math.ceil(
                  newsComment.data.totalItems / newsComment.data.itemPerPage,
                )}
                page={page}
                onChange={onChange}
              />
            </CardContent>
          ) : (
            <Typography variant="body2">Không có bình luận</Typography>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default NewsCommentList;
