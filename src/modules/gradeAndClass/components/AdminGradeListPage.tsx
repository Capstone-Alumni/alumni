'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminGradeListTable from './AdminGradeListTable';
import { useState } from 'react';
import GradeForm, { GradeFormValues } from './GradeForm';

import useCreateGrade from '../hooks/useCreateGrade';
import useGetGradeList from '../hooks/useGetGradeList';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useDeleteGradeById from '../hooks/useDeleteGradeById';
import useUpdateGradeById from '../hooks/useUpdateGradeById';
import { useRecoilState } from 'recoil';
import { getGradeListParamsAtom } from '../state';

const AdminGradeListPage = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);

  const [params, setParams] = useRecoilState(getGradeListParamsAtom);

  const { createGrade } = useCreateGrade();
  const { deleteGradeById } = useDeleteGradeById();
  const { updateGradeById } = useUpdateGradeById();
  const {
    reload,
    data: gradeListData,
    isLoading: isGettingGrade,
  } = useGetGradeList();

  const onAddGrade = async (values: GradeFormValues) => {
    await createGrade(values);
    reload();
  };

  const onDelete = async (gradeId: string) => {
    await deleteGradeById({ gradeId });
    reload();
  };

  const onUpdate = async (gradeId: string, { code, name }: GradeFormValues) => {
    await updateGradeById({ gradeId, code, name });
    reload();
  };

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
        <GradeForm onSubmit={onAddGrade} onClose={() => setOpenForm(false)} />
      ) : null}

      <Box
        sx={{
          width: '100%',
        }}
      >
        {isGettingGrade ? <LoadingIndicator /> : null}

        {gradeListData?.data ? (
          <AdminGradeListTable
            data={gradeListData?.data}
            onDelete={onDelete}
            onEdit={onUpdate}
            page={params.page || 1}
            onChangePage={(nextPage) => {
              setParams((prevParams) => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminGradeListPage;
