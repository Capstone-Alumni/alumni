'use client';

import { Box, Chip, Link, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from '@share/utils/formatDate';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import { getShortTitle } from '@share/utils/getShortTitle';
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
      <Link
        sx={{
          color: 'inherit',
          '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
          },
        }}
        href={`/news/${item.id}`}
      >
        <PublicNewsCardItemImage srcImg={srcImg} sx={sx} />
        <Box
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          <Typography
            sx={{
              marginTop: sx.marginImg,
              cursor: 'pointer',
            }}
            variant={sx.typoVariant}
          >
            {getShortTitle(item.title)}
          </Typography>

          <Typography
            sx={{ textTransform: 'capitalize', mb: 1 }}
            color="GrayText"
          >
            {formatDate(new Date(item.createdAt))}
          </Typography>

          <Chip label="Example tag" variant="outlined" color="primary" />
        </Box>
      </Link>
    </Box>
  );
};
export default PublicNewsCardItems;
