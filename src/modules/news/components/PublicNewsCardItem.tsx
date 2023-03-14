'use client';

import { Box, Chip, Link, Typography } from '@mui/material';
import { formatDate } from '@share/utils/formatDate';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';
import { News, TagsNews } from '../types';
import PublicNewsCardItemImage from './PublicNewsCardItemImage';
import ArticleIcon from '@mui/icons-material/Article';

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
              maxHeight: 60,
            }}
            noWrap
            variant={sx.typoVariant}
          >
            {item.title}
          </Typography>
          <Box
            sx={{
              display: sx.imgWidth > 250 ? 'flex' : 'block',
              mb: 1,
            }}
          >
            <Typography
              sx={{ textTransform: 'capitalize', fontSize: 14 }}
              color="GrayText"
            >
              {formatDate(new Date(item.createdAt))}
            </Typography>
            <Box
              sx={{
                ml: 'auto',
                display: 'flex',
              }}
            >
              <ArticleIcon
                fontSize="small"
                sx={{
                  color: 'gray',
                }}
              />
              <Typography
                sx={{ fontSize: 14, fontWeight: 600 }}
                color="GrayText"
              >
                {item.authorInfo ? item.authorInfo.fullName : 'Chưa cập nhật'}
              </Typography>
            </Box>
          </Box>
          {item.tagsNews?.map((tag: TagsNews) => (
            <Chip
              key={tag.id}
              label={tag.tagName}
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                mr: 0.25,
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Link>
    </Box>
  );
};
export default PublicNewsCardItems;
