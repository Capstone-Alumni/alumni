'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminClassListTable from './AdminClassListTable';
import { useState } from 'react';
import ClassForm, { ClassFormValues } from './ClassForm';

import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import { getClassListParamsAtom } from '../state';
import useCreateClass from '../hooks/useCreateClass';
import useDeleteClassById from '../hooks/useDeleteClassById';
import useUpdateClassById from '../hooks/useUpdateClassById';
import useGetClassList from '../hooks/useGetClassList';
import { usePathname } from 'next/navigation';
import LoadingIndicator from '@share/components/LoadingIndicator';

const AdminClassListPage = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);

  const pathname = usePathname();

  const gradeId = pathname?.split('/')[4] || '';

  const [params, setParams] = useRecoilState(getClassListParamsAtom);

  const { createClass } = useCreateClass();
  const { deleteClassById } = useDeleteClassById();
  const { updateClassById } = useUpdateClassById();
  const {
    reload,
    data: classListData,
    isLoading: isGettingClass,
  } = useGetClassList(gradeId);

  const onAddClass = async (values: ClassFormValues) => {
    await createClass({ ...values, gradeId });
    reload();
  };

  const onDelete = async (classId: string) => {
    await deleteClassById({ classId });
    reload();
  };

  const onUpdate = async (classId: string, { name }: ClassFormValues) => {
    await updateClassById({ classId, name });
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
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography>
            <Link href="/admin/config/grade">Danh sách niên khoá</Link>
          </Typography>
          <Typography variant="h3">Lớp</Typography>
        </Box>
        {openForm ? null : (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
          >
            Thêm lớp mới
          </Button>
        )}
      </Box>

      {openForm ? (
        <ClassForm onSubmit={onAddClass} onClose={() => setOpenForm(false)} />
      ) : null}

      <Box
        sx={{
          width: '100%',
        }}
      >
        {isGettingClass ? <LoadingIndicator /> : null}

        {classListData?.data ? (
          <AdminClassListTable
            data={classListData?.data}
            onDelete={onDelete}
            onEdit={onUpdate}
            page={params.page || 1}
            reload={reload}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminClassListPage;
