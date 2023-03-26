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
import Link from 'next/link';
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
  // const searchParams = useSearchParams();
  // const name = searchParams.get('name');
  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { page } = params;
  // const usersProfileResponse = useGetUsersProfileQuery({
  //   name: name || '',
  //   page,
  //   limit: 5,
  // });
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);
  const { data: profileListData, isLoading } = useGetProfileList();

  const handleRenderUsersProfile = () => {
    if (!isLoading && profileListData?.data && currentUserInformation) {
      return (
        <Grid container spacing={3} maxWidth="md" sx={{ margin: 'auto' }}>
          <Grid item xs={12} md={12}>
            <Stack sx={{ margin: '0 0 1rem 0' }}>
              <Typography variant="h6">Kết quả tìm kiếm</Typography>
            </Stack>
            {profileListData?.data.items.map((user: any) => {
              return (
                <Card sx={{ margin: '1rem 0' }} key={user.userId}>
                  <Link
                    href={`/profile/${user.userId}?profile_tab=information`}
                    prefetch={false}
                    passHref
                    style={{ color: 'inherit' }}
                  >
                    <Wrapper>
                      <Box display={'flex'}>
                        <Avatar
                          sx={{ width: 60, height: 60 }}
                          photoUrl={user?.avatarUrl ?? null}
                          displayName={user?.fullName}
                        />
                        <Box
                          sx={{
                            marginLeft: '0.5rem',
                            alignSelf: 'center',
                            width: '100%',
                          }}
                        >
                          <Typography fontWeight={600}>
                            {user.fullName}
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
    setParams((prev) => ({ ...prev, page: value }));
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : profileListData.data.items.length > 0 ? (
        <>
          {handleRenderUsersProfile()}
          <Grid
            container
            spacing={3}
            maxWidth="md"
            sx={{
              marginTop: '3rem',
              margin: 'auto',
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
