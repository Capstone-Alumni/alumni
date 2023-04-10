'use client';

import {
  alpha,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDate } from '@share/utils/formatDate';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import React from 'react';

const NewsCard = ({
  item,
  sx,
  relativeImg = false,
}: {
  item: any;
  sx?: any;
  relativeImg?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(35),
      }}
    >
      <CardMedia
        title="news image"
        component="div"
        sx={{
          height: theme.spacing(23),
          padding: theme.spacing(2),
          backgroundImage: `url(${
            item.newsImageUrl ? item.newsImageUrl : getImageOfNews(item.content)
          })`,
        }}
      />
      {/* {!srcImg.startsWith('/logo') ? (
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
      )} */}

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          {item.title}
        </Typography>
        {/* <Typography variant="body2">{item.content}</Typography> */}

        <Box sx={{ flex: 1 }} />

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
          <Link
            href={`/news/${item.id}`}
            style={{ textDecoration: 'underline' }}
          >
            <Typography variant="button">Đọc tiếp</Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};
export default NewsCard;
