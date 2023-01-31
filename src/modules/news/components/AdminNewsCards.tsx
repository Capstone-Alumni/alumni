'use client';

import { Box } from '@mui/material';
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
    <Box>
      {data.items.map((item: any) => (
        <AdminNewsCardItem item={item} key={item.id} />
      ))}
    </Box>
  );
};

export default AdminNewsCards;
