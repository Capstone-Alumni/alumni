'use client';

import { Box, Card, CardContent, Chip, Link, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReactHtmlParser from 'html-react-parser';

const AdminNewsCardItem = ({ item }: { item: any }) => {
  const content = ReactHtmlParser(item.content);
  return (
    <Card
      sx={{
        display: 'flex',
        height: '200px',
        gap: '24px',
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography variant="h5">{item.title}</Typography>
          {item.newsCategories.map((category: any) => (
            <Chip
              key={item.id}
              sx={{
                ml: 1,
              }}
              label={category}
            />
          ))}

          <Link
            sx={{
              marginLeft: 'auto',
            }}
            href={`/admin/news/${item.id}`}
          >
            Xem chi tiết
          </Link>
        </Box>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: '12px',
          }}
        >
          Author
        </Typography>
        <Box
          sx={{
            overflow: 'hidden',
            pt: 0.5,
            width: '100%',
            height: '120px',
            textOverflow: 'ellipsis',
            fontSize: '14px',
          }}
        >
          {content}
        </Box>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '24px',
          }}
        >
          <AccessTimeIcon color="disabled" />
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 500,
              color: '#6f7887',
            }}
            variant="body2"
          >
            Ngày đăng: {new Date(item.createdAt).toDateString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNewsCardItem;
