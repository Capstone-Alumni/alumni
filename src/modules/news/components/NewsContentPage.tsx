'use client';
import { Box, Chip, Typography } from '@mui/material';
import parse from 'html-react-parser';
// import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { News, TagsNews } from '../types';
import { formatDate } from '@share/utils/formatDate';

const NewsContentPage = ({ data }: { data: News }) => {
  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: '40px',
            lineHeight: '54px',
            color: '#292929',
            wordBreak: 'break-word',
          }}
          variant="h3"
        >
          {data.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginY: '24px',
        }}
      >
        {/* <CreateIcon fontSize="small" color="disabled" /> */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Tác giả: {data.authorInfo ? data.authorInfo.fullName : data.authorId}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            marginLeft: 'auto',
          }}
        >
          <CalendarMonthIcon fontSize="small" color="disabled" />
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {formatDate(new Date(data.createdAt))}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          lineHeight: 1.8,
          marginBottom: 4,
          img: {
            height: 'auto',
          },
        }}
      >
        {parse(data.content)}
      </Box>
      <Box
        sx={{
          marginY: '24px',
        }}
      >
        {data.tagsNews
          ? data.tagsNews.map((tag: TagsNews) => (
              <Chip
                key={tag.id}
                sx={{
                  margin: 0.5,
                }}
                label={tag.tagName}
              />
            ))
          : null}
      </Box>
    </>
  );
};

export default NewsContentPage;
