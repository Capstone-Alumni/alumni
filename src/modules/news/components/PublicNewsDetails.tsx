'use client';
import { Box } from '@mui/material';
import EveryOneReadPage from './EveryOneReadPage';
import { News } from '../types';
import NewsContentPage from './NewsContentPage';

const PublicNewsDetails = ({ data }: { data: News }) => {
  return (
    <Box
      sx={{
        margin: 'auto',
        width: '60%',
      }}
    >
      <NewsContentPage data={data} />
      <Box>
        <EveryOneReadPage />
      </Box>
    </Box>
  );
};

export default PublicNewsDetails;
