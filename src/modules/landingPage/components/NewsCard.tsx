'use client';

import {
  alpha,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDate } from '@share/utils/formatDate';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';
import Link from '@share/components/NextLinkV2';

const NewsCard = ({
  item,
  totalItems = 3,
}: {
  item: any;
  sx?: any;
  relativeImg?: boolean;
  totalItems?: number;
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: `calc(100% / ${totalItems})`,
        boxShadow: 'none',
        '&:hover': {
          opacity: '0.5',
          transition: 'all 0.2s',
        },
      }}
    >
      <Link prefetch={false} href={`/news/${item.id}`}>
        <CardMedia
          title={item.title}
          component="div"
          sx={{
            height: theme.spacing(23),
            padding: theme.spacing(2),
            borderRadius: '12px',
            backgroundImage: `url(${
              item.newsImageUrl
                ? item.newsImageUrl
                : getImageOfNews(item.content)
            })`,
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: theme.spacing(1),
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        >
          <Typography fontSize={18} fontWeight={600}>
            {item.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: alpha(theme.palette.common.black, 0.6),
              }}
              variant="body2"
            >
              {formatDate(new Date(item.createdAt))}
            </Typography>
            {/* <Link
            href={`/news/${item.id}`}
            style={{ textDecoration: 'underline' }}
          >
            <Typography variant="button">Đọc tiếp</Typography>
          </Link> */}
          </Box>
        </CardContent>{' '}
      </Link>
    </Card>
  );
};
export default NewsCard;
