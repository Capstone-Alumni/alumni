'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminClassListTable from './AdminClassListTable';
import { useState } from 'react';
import ClassForm from './ClassForm';

import mockData from '../__mockData__/getClassList';
import { noop } from 'lodash/fp';
import Link from 'next/link';

const AdminClassListPage = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">
          <Link href="/admin/grade">Niên khoá</Link> / Lớp
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Thêm lớp mới
        </Button>
      </Box>

      {openForm ? (
        <ClassForm onSubmit={noop} onClose={() => setOpenForm(false)} />
      ) : null}

      <Box
        sx={{
          width: '100%',
        }}
      >
        <AdminClassListTable
          data={mockData.data}
          onDelete={noop}
          onEdit={noop}
          page={1}
          onChangePage={noop}
        />
      </Box>
    </Box>
  );
};

export default AdminClassListPage;
