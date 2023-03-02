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
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useGetUsersProfileQuery } from 'src/redux/slices/searchProfiles';
import Avatar from '@share/components/MyAvatar';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { useState } from 'react';
import LoadingIndicator from '@share/components/LoadingIndicator';
// ----------------------------------------------------------------------

const Wrapper = styled('div')(({ theme }) => ({
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
}));

const SeachPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const router = useRouter();
  const [page, setPage] = useState(1);
  const usersProfileResponse = useGetUsersProfileQuery({
    name: name || '',
    page,
    limit: 5,
  });
  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  const handleDirectToProfile = (userId: string) => {
    router.push(`/profile/${userId}?profile_tab=information`);
  };

  const handleRenderUsersProfile = () => {
    if (
      !usersProfileResponse.isLoading &&
      usersProfileResponse?.data?.data &&
      currentUser?.data
    ) {
      return (
        <Grid container spacing={3} maxWidth="md" sx={{ margin: 'auto' }}>
          <Grid item xs={12} md={12}>
            <Stack sx={{ margin: '0 0 1rem 0' }}>
              <Typography variant="h6">
                {name ? 'Kết quả tìm kiếm' : 'Người bạn có thể quen'}
              </Typography>
            </Stack>
            {usersProfileResponse?.data?.data?.items?.map((user: any) => {
              return (
                <Card sx={{ margin: '1rem 0' }} key={user.userId}>
                  <Wrapper onClick={() => handleDirectToProfile(user.userId)}>
                    <Box display={'flex'}>
                      <Avatar
                        sx={{ width: 60, height: 60 }}
                        src={user?.avatarUrl ?? null}
                      />
                      <Box
                        sx={{
                          marginLeft: '0.5rem',
                          alignSelf: 'center',
                          width: '100%',
                        }}
                      >
                        <Link
                          href={`/profile/${user.userId}?profile_tab=information`}
                          style={{ color: 'inherit', fontWeight: 'bold' }}
                        >
                          {user.fullName}
                        </Link>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          sx={{ justifyContent: 'space-between' }}
                        >
                          {user?.alumClass && (
                            <Typography variant="caption">
                              <strong>Khối: </strong>
                              {user?.alumClass.grade.code} -{' '}
                              {user?.alumClass.grade.name}
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
                </Card>
              );
            })}
          </Grid>
        </Grid>
      );
    }
  };

  const handleChangePage = (event: any, value: any) => {
    setPage(value);
    // usersProfileResponse.refetch({});
  };

  return (
    <>
      {usersProfileResponse.isLoading ? (
        <LoadingIndicator />
      ) : (
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
                  usersProfileResponse?.data?.data.totalItems /
                    usersProfileResponse?.data?.data.itemPerPage,
                )}
                color="primary"
                onChange={handleChangePage}
              />
            </Stack>
          </Grid>
        </>
      )}
    </>
  );
};

export default SeachPage;
