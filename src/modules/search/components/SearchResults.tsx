'use client';
import {
  alpha,
  Box,
  Card,
  Grid,
  Pagination,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Link from '@share/components/NextLinkV2';
import Avatar from '@share/components/MyAvatar';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import useGetProfileList from '../hooks/useGetProfileList';
import { getProfileListParamsAtom } from '../states';
// ----------------------------------------------------------------------

const Wrapper = styled('div')(({ theme }) => ({
  padding: '0.5rem 1rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
}));

const SeachPage = () => {
  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { page } = params;

  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const { data: profileListData, isLoading } = useGetProfileList();

  const handleRenderUsersProfile = () => {
    if (!isLoading && profileListData?.data && currentUserInformation) {
      return (
        <Grid container maxWidth="md" sx={{ margin: 'auto' }}>
          <Grid item xs={12} md={12}>
            {profileListData?.data.items.map((user: any) => {
              return (
                <Card sx={{ margin: '1rem 0' }} key={user.id}>
                  <Link
                    href={`/profile/${user.id}?profile_tab=information`}
                    prefetch={false}
                    passHref
                    style={{ color: 'inherit' }}
                  >
                    <Wrapper>
                      <Box display={'flex'}>
                        <Avatar
                          sx={{ width: 60, height: 60 }}
                          photoUrl={user?.information.avatarUrl ?? null}
                          displayName={user?.information.fullName}
                        />
                        <Box
                          sx={{
                            marginLeft: '0.5rem',
                            alignSelf: 'center',
                            width: '100%',
                          }}
                        >
                          <Typography fontWeight={600}>
                            {user?.information.fullName}
                          </Typography>
                          <Box
                            display={'flex'}
                            flexDirection="column"
                            sx={{ justifyContent: 'space-between' }}
                          >
                            {user?.alumClass && (
                              <Typography variant="caption">
                                <strong>Khối: </strong>
                                {user?.alumClass.grade.code}
                              </Typography>
                            )}
                            {user?.alumClass && (
                              <Typography variant="caption">
                                <strong>Lớp: </strong>
                                {user?.alumClass.name}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Wrapper>
                  </Link>
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
