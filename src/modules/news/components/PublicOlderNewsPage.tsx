import { Box, Pagination, Typography } from '@mui/material';
import { News } from '../types';
import PublicNewsCardItems from './PublicNewsCardItem';

type NewsParams = {
  page: number;
  limit: number;
  title?: string;
  content?: string;
};

const PublicOlderNewsPage = ({
  newsList,
  totalItems,
  itemPerPage,
  olderNewsParams,
  onChangePage,
}: {
  newsList: News[];
  totalItems: number;
  itemPerPage: number;
  olderNewsParams: NewsParams;
  onChangePage: (value: number) => void;
}) => {
  return (
    <Box
      sx={{
        width: '80%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginTop: 4,
          fontFamily: 'Poppins-SVN,sans-serif',
        }}
      >
        Những tin cũ hơn
      </Typography>
      <>
        <Box
          className="older-news"
          sx={{
            display: 'flex',
            gap: '60px',
            marginTop: 4,
            height: '250px',
            marginBottom: 4,
          }}
        >
          {newsList.map((item: News) => (
            <PublicNewsCardItems
              key={item.id}
              item={item}
              sx={{
                width: '25%',
                height: '150px',
                imgWidth: 350,
                imgHeight: 150,
                typoVariant: 'h6',
                marginImg: 2,
              }}
            />
          ))}
        </Box>
        <Pagination
          page={olderNewsParams.page - 2}
          sx={{
            margin: 'auto',
          }}
          count={Math.ceil((totalItems - 6) / itemPerPage)}
          onChange={(_, value) => onChangePage(value)}
        />
      </>
    </Box>
  );
};

export default PublicOlderNewsPage;
