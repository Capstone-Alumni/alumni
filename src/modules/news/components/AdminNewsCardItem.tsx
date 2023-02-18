'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReactHtmlParser from 'html-react-parser';
import Switch from '@mui/material/Switch';
import { News } from '../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useUpdateNewsByIdMutation } from 'src/redux/slices/newsSlice';

const AdminNewsCardItem = ({ item }: { item: News }) => {
  const content = ReactHtmlParser(item.content);
  const [updateNewsPublic] = useUpdateNewsByIdMutation();
  const handlePublicNews = async () => {
    await updateNewsPublic({
      newsId: item.id,
      isPublic: !item.isPublic,
    });
  };

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
          <Link
            sx={{
              textDecoration: 'none',
            }}
            href={`/admin/news/${item.id}`}
          >
            <Typography
              variant="h5"
              sx={{
                cursor: 'pointer',
                color: '#000000',
              }}
            >
              {item.title}
            </Typography>
          </Link>
          {item.newsCategories
            ? item.newsCategories.map((category: any) => (
                <Chip
                  key={item.id}
                  sx={{
                    ml: 1,
                  }}
                  label={category}
                />
              ))
            : null}

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            marginTop: 3,
          }}
        >
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
          <Box
            sx={{
              display: 'flex',
              marginLeft: 'auto',
            }}
          >
            <Tooltip title="Công khai tin này cho mọi người.">
              <Switch checked={item.isPublic} onChange={handlePublicNews} />
            </Tooltip>
            <Tooltip title="Xóa tin này!">
              <DeleteOutlineIcon
                sx={{
                  margin: 'auto',
                  marginLeft: 4,
                }}
                color="error"
              />
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminNewsCardItem;
