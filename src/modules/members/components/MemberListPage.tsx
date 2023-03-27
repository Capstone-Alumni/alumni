'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MemberListTable from './MemberListTable';
import { useEffect, useState } from 'react';

import useCreateMember from '../hooks/useCreateMember';
import useDeleteMemberById from '../hooks/useDeleteMemberById';
import useUpdateMemberById from '../hooks/useUpdateMemberById';
import useGetMemberList from '../hooks/useGetMemberList';
import LoadingIndicator from '@share/components/LoadingIndicator';
import MemberForm, { MemberFormValues } from './MemberForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMemberListParamsAtom } from '../state';
import { currentTenantDataAtom } from '@share/states';
import Link from 'next/link';
import UploadMemeberFileButton from './UploadMemberFileButton';

const MemberListPage = () => {
  const theme = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);

  const [params, setParams] = useRecoilState(getMemberListParamsAtom);

  const { createMember } = useCreateMember();
  const { deleteMemberById } = useDeleteMemberById();
  const { updateMemberById } = useUpdateMemberById();
  const {
    reload,
    data: memberListData,
    isLoading: isGettingMember,
  } = useGetMemberList();

  const onAddMember = async (values: MemberFormValues) => {
    await createMember({ ...values, tenantId });
    reload();
  };

  const onDelete = async (memberId: string) => {
    await deleteMemberById({ memberId });
    reload();
  };

  const onUpdate = async (
    memberId: string,
    { password, accessLevel }: MemberFormValues,
  ) => {
    await updateMemberById({ memberId, password, accessLevel });
    reload();
  };

  useEffect(() => {
    setParams(prev => ({ ...prev, tenantId: tenantId }));
  }, [tenantId]);

  if (!tenantId) {
    return <LoadingIndicator />;
  }

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
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          Cựu học sinh
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Thêm
        </Button>
      </Box>

      {openForm ? (
        <MemberForm onSubmit={onAddMember} onClose={() => setOpenForm(false)} />
      ) : null}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
        }}
      >
        <UploadMemeberFileButton />

        <Link href="#" target="_blank">
          File mẫu
        </Link>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {isGettingMember ? <LoadingIndicator /> : null}

        {memberListData?.data ? (
          <MemberListTable
            data={memberListData?.data}
            onDelete={onDelete}
            onEdit={onUpdate}
            page={params.page || 1}
            onChangePage={(nextPage: number) => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default MemberListPage;
