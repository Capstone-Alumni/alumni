'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';
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
        mb: 4,
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div">
          {item.title}
        </Typography>
        <Typography color="text.secondary">Author</Typography>
        <Box
          sx={{
            overflow: 'hidden',
            pt: 2,
            width: '100%',
            height: '60px',
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
            Ngay dang: {new Date(item.createdAt).toDateString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNewsCardItem;
