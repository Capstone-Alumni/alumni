'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminGradeListTable from './AdminGradeListTable';
import { useState } from 'react';
import GradeForm from './GradeForm';

import mockData from '../__mockData__/getGradeList';
import { noop } from 'lodash/fp';

const AdminGradeListPage = () => {
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
        <Typography variant="h3">Niên khoá</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Thêm khoá mới
        </Button>
      </Box>

      {openForm ? (
        <GradeForm onSubmit={noop} onClose={() => setOpenForm(false)} />
      ) : null}

      <Box
        sx={{
          width: '100%',
        }}
      >
        <AdminGradeListTable
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

export default AdminGradeListPage;
