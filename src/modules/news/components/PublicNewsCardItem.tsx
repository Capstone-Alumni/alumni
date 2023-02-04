'use client';

import { Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import Image from 'next/image';
import parse from 'html-react-parser';
import React from 'react';
import { useRouter } from 'next/navigation';

const PublicNewsCardItems = ({
  item,
  sx,
  relativeImg = false,
}: {
  item: any;
  sx?: any;
  relativeImg?: boolean;
}) => {
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
      <Card
        sx={{
          height: sx.height,
        }}
      >
        {!srcImg.startsWith('/logo') ? (
          <div
            style={{
              height: '100%',
            }}
          >
            {parse(srcImg)}
          </div>
        ) : (
          <Image
            src={srcImg}
            alt="logo"
            width={sx.imgWidth}
            height={sx.imgHeight}
          />
        )}
      </Card>
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
