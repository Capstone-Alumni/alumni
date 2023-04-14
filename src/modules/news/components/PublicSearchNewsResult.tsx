import { Box, Pagination, Typography } from '@mui/material';
import { News } from '../types';
import PublicNewsCardItems from './PublicNewsCardItem';

const PublicSearchNewsResult = ({
  newsList,
  totalItems,
  itemPerPage,
  searchNewsParams,
  onChangeSearchPage,
}: {
  newsList: News[];
  totalItems: number;
  itemPerPage: number;
  searchNewsParams: any;
  onChangeSearchPage: (value: number) => void;
}) => {
  return (
    <Box
      sx={{
        width: '80%',
        margin: 'auto',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginTop: 4,
          fontFamily: 'Poppins-SVN,sans-serif',
        }}
      >
        Kết quả tìm kiếm
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            gap: '32px',
            marginTop: 4,
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: 4,
          }}
        >
          {newsList.map((item: News) => (
            <PublicNewsCardItems
              key={item.id}
              item={item}
              sx={{
                width: '100%',
                height: '200px',
                imgWidth: 1000,
                imgHeight: 200,
                typoVariant: 'h5',
                marginImg: 2,
              }}
            />
          ))}
        </Box>
        <Pagination
          page={searchNewsParams.page}
          sx={{
            margin: 'auto',
          }}
          count={Math.ceil(totalItems / itemPerPage)}
          onChange={(_, value) => onChangeSearchPage(value)}
        />
      </Box>
    </Box>
  );
};

export default PublicSearchNewsResult;
