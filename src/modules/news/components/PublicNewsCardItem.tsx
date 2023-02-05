'use client';

import { Box, Typography } from '@mui/material';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';
import { useRouter } from 'next/navigation';
import PublicNewsCardItemImage from './PublicNewsCardItemImage';

const PublicNewsCardItems = ({ item, sx }: { item: any; sx?: any }) => {
  const srcImg = getImageOfNews(item.content);
  const router = useRouter();
  const readNewsDetails = (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();
    router.replace(`/news/${item.id}`);
  };
  return (
    <Box
      sx={{
        width: sx.width,
      }}
    >
      <PublicNewsCardItemImage srcImg={srcImg} sx={sx} />
      <Typography
        sx={{
          marginTop: sx.marginImg,
          cursor: 'pointer',
        }}
        onClick={readNewsDetails}
        variant={sx.typoVariant}
      >
        {item.title}
      </Typography>
    </Box>
  );
};
export default PublicNewsCardItems;
