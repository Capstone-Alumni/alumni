'use client';

import { Box, Pagination, Typography } from '@mui/material';
import { GetNewsListData, News } from '../types';
import AdminNewsCardItem from './AdminNewsCardItem';

const AdminNewsCards = ({
  data,
  page,
  onChange,
}: {
  data: GetNewsListData;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {data.totalItems === 0 ? (
        <Typography fontWeight={600} textAlign="center">
          Không có tin tức
        </Typography>
      ) : null}

      <Box
        sx={{
          height: '90vh',
        }}
      >
        {data.items.map((item: News) => (
          <AdminNewsCardItem item={item} key={item.id} />
        ))}
      </Box>

      <Pagination
        sx={{
          margin: 'auto',
        }}
        count={Math.ceil(data.totalItems / data.itemPerPage)}
        page={page}
        onChange={onChange}
      />
    </Box>
  );
};

export default AdminNewsCards;
