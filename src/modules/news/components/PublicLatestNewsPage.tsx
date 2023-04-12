import { Box, Typography } from '@mui/material';
import { News } from '../types';
import PublicNewsCardItems from './PublicNewsCardItem';

const PublicLatestNewsPage = ({ newsList }: { newsList: News[] }) => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          marginTop: 2,
          fontFamily: 'Poppins-SVN,sans-serif',
        }}
      >
        Mới nhất
      </Typography>
      <Box
        className="first-two-news"
        sx={{
          display: 'flex',
          gap: '16px',
          marginTop: 2,
        }}
      >
        {newsList.slice(0, 2).map((item: News) => (
          <PublicNewsCardItems
            key={item.id}
            item={item}
            sx={{
              width: '50%',
              height: '250px',
              imgWidth: 500,
              imgHeight: 250,
              typoVariant: 'h5',
              marginImg: 2,
            }}
          />
        ))}
      </Box>
      <Box
        className="next-four-news"
        sx={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: 4,
        }}
      >
        {newsList.slice(2, 6).map((item: News) => (
          <PublicNewsCardItems
            key={item.id}
            item={item}
            sx={{
              width: '33%',
              height: '150px',
              imgWidth: 250,
              imgHeight: 150,
              typoVariant: 'h6',
              marginImg: 2,
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default PublicLatestNewsPage;
