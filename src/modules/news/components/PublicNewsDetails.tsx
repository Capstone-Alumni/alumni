'use client';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useGetNewsByIdForPublicQuery } from 'src/redux/slices/newsSlice';
import LoadingIndicator from '@share/components/LoadingIndicator';
import NewsContentPage from './NewsContentPage';
import EveryOneReadPage from './EveryOneReadPage';
import CommentSection from './CommentSection';

const PublicNewsDetails = () => {
  const pathname = usePathname();
  const newsId = pathname?.split('/')[2] || '';
  const { data, isLoading } = useGetNewsByIdForPublicQuery(newsId);
  return (
    <Box
      sx={{
        margin: 'auto',
        width: '60%',
      }}
    >
      {isLoading ? <LoadingIndicator /> : null}
      {data ? (
        <>
          <NewsContentPage data={data.data} />
          <CommentSection />
          <Box>
            <EveryOneReadPage />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default PublicNewsDetails;
