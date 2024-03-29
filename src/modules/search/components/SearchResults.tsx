'use client';
import {
  alpha,
  Box,
  Card,
  Chip,
  Grid,
  Pagination,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from '@share/components/NextLinkV2';
import Avatar from '@share/components/MyAvatar';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Alumni, currentUserInformationDataAtom } from '@share/states';
import useGetProfileList from '../hooks/useGetProfileList';
import { getProfileListParamsAtom } from '../states';
import { Class } from 'src/modules/gradeAndClass/types';
import { groupBy } from 'lodash/fp';
import { Button } from '@mui/material';
import useDeleteMemberById from 'src/modules/members/hooks/useDeleteMemberById';
import { useState } from 'react';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
// ----------------------------------------------------------------------

const Wrapper = styled('div')(({ theme }) => ({
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
}));

const getGradeClassDisplay = (alumClass: Class) => {
  const grade = alumClass.grade;
  if (grade?.code) {
    return `${grade.code} - ${alumClass.name}`;
  }
  return `${alumClass.name} (${grade?.startYear} - ${grade?.endYear})`;
};

const getClassDisplay = (alumClass: Class) => {
  return `${alumClass.name}`;
};

const SeachPage = () => {
  const theme = useTheme();

  const [openDeleteModalId, setOpenDeleteModalId] = useState('');

  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { page } = params;

  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const { data: profileListData, isLoading, reload } = useGetProfileList();

  const { deleteMemberById } = useDeleteMemberById();

  const handleRenderUsersProfile = () => {
    if (!isLoading && profileListData?.data && currentUserInformation) {
      return (
        <Grid container maxWidth="md" sx={{ margin: 'auto' }}>
          <Grid item xs={12} md={12}>
            {profileListData?.data.items.map((user: Alumni) => {
              const groupedClass = groupBy<{
                id: string;
                isClassMod: boolean;
                alumClass: Class;
              }>(({ alumClass }) => alumClass.gradeId)(user?.alumniToClass);

              const hasRemovalPermission =
                currentUserInformation?.isOwner ||
                currentUserInformation?.gradeMod?.find(
                  gr =>
                    gr.gradeId === user?.alumniToClass?.[0].alumClass.gradeId,
                ) ||
                currentUserInformation?.alumniToClass?.find(
                  al =>
                    al.isClassMod &&
                    al.alumClassId === user?.alumniToClass?.[0].alumClassId,
                );

              return (
                <Card sx={{ margin: '1rem 0' }} key={user.id}>
                  <Link
                    href={`/profile/${user.id}`}
                    passHref
                    style={{
                      color: 'inherit',
                    }}
                  >
                    <Wrapper>
                      <Box display={'flex'}>
                        <Avatar
                          sx={{ width: 60, height: 60 }}
                          photoUrl={user?.information?.avatarUrl ?? undefined}
                          displayName={user?.information?.fullName}
                        />
                        <Box
                          sx={{
                            marginLeft: '0.5rem',
                            alignSelf: 'center',
                            width: '100%',
                          }}
                        >
                          <Stack direction="row" gap={2}>
                            <Typography fontWeight={600} sx={{ mb: 1 }}>
                              {user?.information?.fullName}
                            </Typography>

                            <Box sx={{ flex: 1 }} />

                            {user?.information?.email ? null : (
                              <Button
                                variant="outlined"
                                size="small"
                                color="warning"
                              >
                                Không có tài khoản
                              </Button>
                            )}

                            {!user?.information?.email &&
                            hasRemovalPermission ? (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setOpenDeleteModalId(user.id);
                                }}
                              >
                                Xoá thành viên
                              </Button>
                            ) : null}
                          </Stack>

                          <Box
                            display={'flex'}
                            flexDirection="column"
                            sx={{ justifyContent: 'space-between' }}
                          >
                            {Object.keys(groupedClass).map((gradeId, index) => {
                              const group = groupedClass[gradeId];
                              const grade = group[0].alumClass?.grade;

                              if (!grade) {
                                return null;
                              }

                              return (
                                <Stack
                                  direction="row"
                                  key={gradeId}
                                  alignItems="center"
                                  gap={1}
                                >
                                  <Typography>
                                    {grade.code
                                      ? grade.code
                                      : `${grade?.startYear} - ${grade?.endYear}`}
                                  </Typography>
                                  {group.map(gr => (
                                    <Chip
                                      key={gr.id}
                                      label={gr.alumClass.name}
                                      size="small"
                                    />
                                  ))}
                                </Stack>
                              );
                            })}
                          </Box>
                        </Box>
                      </Box>
                    </Wrapper>
                  </Link>

                  <ConfirmDeleteModal
                    open={openDeleteModalId === user.id}
                    title="Bạn muốn xoá thành viên này?"
                    onClose={() => setOpenDeleteModalId('')}
                    onDelete={async () => {
                      await deleteMemberById({ memberId: user.id });
                      setOpenDeleteModalId('');
                      reload();
                    }}
                  />
                </Card>
              );
            })}
          </Grid>
        </Grid>
      );
    }
  };

  const handleChangePage = (event: any, value: any) => {
    setParams(prev => ({ ...prev, page: value }));
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : profileListData?.data?.items?.length > 0 ? (
        <>
          {handleRenderUsersProfile()}
          <Grid
            container
            maxWidth="md"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={4}>
              <Pagination
                page={page}
                count={Math.ceil(
                  (profileListData?.data.totalItems || 0) /
                    (profileListData?.data.itemPerPage || 1),
                )}
                color="primary"
                onChange={handleChangePage}
              />
            </Stack>
          </Grid>
        </>
      ) : (
        <Grid container spacing={3} maxWidth="md" sx={{ margin: 'auto' }}>
          <Stack sx={{ margin: '2rem 0 1rem 0', width: '100%' }}>
            <Typography variant="h6" textAlign="center">
              Hiện chưa có thông tin cựu học sinh nào phù hợp với tìm kiếm của
              bạn
            </Typography>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default SeachPage;
