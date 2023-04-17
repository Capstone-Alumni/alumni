'use client';

import { Box, Chip, Link, Typography } from '@mui/material';
import { formatDate } from '@share/utils/formatDate';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';
import { News, TagsNews } from '../types';
import PublicNewsCardItemImage from './PublicNewsCardItemImage';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
const PublicNewsCardItems = ({ item, sx }: { item: News; sx?: any }) => {
  const srcImg = item.newsImageUrl
    ? item.newsImageUrl
    : getImageOfNews(item.content);

  return (
    <Box
      sx={{
        width: sx.width,
        '&:hover': {
          opacity: '0.85',
          transition: 'all 0.2s',
        },
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
        <Box>
          <Typography
            sx={{
              marginTop: '0.5rem',
              cursor: 'pointer',
              wordBreak: 'break-word',
            }}
            variant={sx.typoVariant}
          >
            {item.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: '4px',
              mb: 1,
              maxHeight: '21px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography
              sx={{ textTransform: 'capitalize', fontSize: 14, width: '60%' }}
              color="GrayText"
            >
              {formatDate(new Date(item.createdAt))}
            </Typography>
            <Box
              sx={{
                ml: 'auto',
                width: '40%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <PermIdentityIcon
                fontSize="small"
                sx={{
                  color: 'gray',
                  marginRight: '0.25rem',
                }}
              />
              <Typography
                sx={{ fontSize: 14, fontWeight: 300 }}
                color="GrayText"
                noWrap
              >
                {item.author
                  ? item.author.information.fullName
                  : 'Chưa cập nhật'}
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
