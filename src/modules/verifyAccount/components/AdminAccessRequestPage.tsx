'use client';

import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import AdminAccessRequestTable from './AdminRequestAccessTable';

const AdminAccessRequestPage = () => {
  return (
    <Box>
      <Typography variant="h3">Xét duyệt thành viên vào lớp</Typography>
      <Typography variant="body2" color="GrayText" sx={{ mb: 4 }}>
        Bạn chỉ có thể xét duyệt các yêu cầu vào lớp của bạn
      </Typography>

      <AdminAccessRequestTable />
    </Box>
  );
};

export default AdminAccessRequestPage;
