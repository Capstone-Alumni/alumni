'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminGradeListTable from './AdminGradeListTable';
import { useState } from 'react';
import GradeForm from './GradeForm';

import useCreateGrade, { CreateGradeParams } from '../hooks/useCreateGrade';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useDeleteGradeById from '../hooks/useDeleteGradeById';
import useUpdateGradeById from '../hooks/useUpdateGradeById';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getGradeListParamsAtom } from '../state';
import AdminClassListPanel from './AdminClassListPanel';
import useGetAdminGradeList from '../hooks/useGetAdminGradeList';
import { currentUserInformationDataAtom } from '@share/states';

const AdminGradeListPage = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);

  const [params, setParams] = useRecoilState(getGradeListParamsAtom);
  const currentUser = useRecoilValue(currentUserInformationDataAtom);

  const { createGrade } = useCreateGrade();
  const { deleteGradeById } = useDeleteGradeById();
  const { updateGradeById } = useUpdateGradeById();
  const {
    reload,
    data: gradeListData,
    isLoading: isGettingGrade,
  } = useGetAdminGradeList(currentUser?.id || '');

  const onAddGrade = async (values: CreateGradeParams) => {
    await createGrade(values);
    reload();
  };

  const onDelete = async (gradeId: string) => {
    await deleteGradeById({ gradeId });
    reload();
  };

  const onUpdate = async (
    gradeId: string,
    { code, startYear, endYear }: CreateGradeParams,
  ) => {
    await updateGradeById({ gradeId, code, startYear, endYear });
    reload();
  };

  console.log(gradeListData?.data);

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
        {openForm ? null : (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
          >
            Thêm khoá mới
          </Button>
        )}
      </Box>

      {openForm ? (
        <GradeForm onSubmit={onAddGrade} onClose={() => setOpenForm(false)} />
      ) : null}

      <AdminClassListPanel />

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
            reload={reload}
            page={params.page || 1}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminGradeListPage;
