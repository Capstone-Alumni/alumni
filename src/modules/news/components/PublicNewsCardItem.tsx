'use client';

import { Box, Link, Typography } from '@mui/material';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';
import { News } from '../types';
import PublicNewsCardItemImage from './PublicNewsCardItemImage';

const PublicNewsCardItems = ({ item, sx }: { item: News; sx?: any }) => {
  const srcImg = item.newsImageUrl
    ? item.newsImageUrl
    : getImageOfNews(item.content);

  return (
    <Box
      sx={{
        width: sx.width,
      }}
    >
      <PublicNewsCardItemImage srcImg={srcImg} sx={sx} />
      <Box
        sx={{
          maxHeight: '100px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        <Link
          sx={{
            color: 'inherit',
            '&:focus, &:hover, &:visited, &:link, &:active': {
              textDecoration: 'none',
            },
          }}
          href={`/news/${item.id}`}
        >
          <Typography
            sx={{
              marginTop: sx.marginImg,
              cursor: 'pointer',
            }}
            variant={sx.typoVariant}
          >
            {item.title}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
export default PublicNewsCardItems;
