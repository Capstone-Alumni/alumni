'use client';
import { Box, Chip, Typography } from '@mui/material';
import parse from 'html-react-parser';
import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EveryOneReadPage from './EveryOneReadPage';

const PublicNewsDetails = ({ data }: { data: any }) => {
  return (
    <Box
      sx={{
        margin: 'auto',
        width: '60%',
      }}
    >
      <Box
        sx={{
          marginY: '24px',
        }}
      >
        {data.newsCategories.map((category: string, index: number) => (
          <Chip
            key={index}
            sx={{
              margin: 0.5,
            }}
            label={category}
          />
        ))}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '40px',
            lineHeight: '54px',
            color: '#292929',
          }}
          variant="h3"
        >
          {data.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginX: 'auto',
          marginY: '24px',
        }}
      >
        <CreateIcon fontSize="small" color="disabled" />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {data.authorId}
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
            {new Date(data.createdAt).toDateString()}
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
      <Box>
        <EveryOneReadPage />
      </Box>
    </Box>
  );
};

export default PublicNewsDetails;
