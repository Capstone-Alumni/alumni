'use client';

import { Box, Pagination } from '@mui/material';
import { noop } from 'lodash';
import AdminNewsCardItem from './AdminNewsCardItem';

const AdminNewsCards = ({
  data,
}: {
  data: any;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onChangePage: (nextPage: number) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {data.items.map((item: any) => (
        <AdminNewsCardItem item={item} key={item.id} />
      ))}
      <Pagination
        sx={{
          margin: 'auto',
        }}
        count={Math.ceil(data.totalItems / data.itemPerPage)}
        page={1}
        onChange={noop}
      />
    </Box>
  );
};

export default AdminNewsCards;
