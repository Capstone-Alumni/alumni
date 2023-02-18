'use client';
import {
  alpha,
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
  Pagination,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useGetUsersProfileQuery } from 'src/redux/slices/searchProfiles';
import Avatar from '@share/components/MyAvatar';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
// ----------------------------------------------------------------------

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  // borderRadius: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
}));

const SeachPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const router = useRouter();
  const usersProfileResponse = useGetUsersProfileQuery(name);
  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  const handleDirectToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
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
              <Typography variant="h6">Kết quả tìm kiếm</Typography>
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
                          href={`/profile/${user.id}`}
                          style={{ color: 'inherit', fontWeight: 'bold' }}
                        >
                          {user.fullName}
                        </Link>
                        <Box
                          display={'flex'}
                          flexDirection="column"
                          sx={{ justifyContent: 'space-between' }}
                        >
                          {isAllowToViewValue(
                            currentUser.data,
                            user,
                            user.emailPublicity,
                          ) && (
                            <Typography variant="caption">
                              <strong>Email: </strong>
                              {user?.userEmail ?? 'Chưa cập nhật'}
                            </Typography>
                          )}
                          {user?.gradeName && (
                            <Typography variant="caption">
                              <strong>Khối: </strong>
                              {user?.gradeName}
                            </Typography>
                          )}
                          {user?.className && (
                            <Typography variant="caption">
                              <strong>Lớp: </strong>
                              {user?.className}
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

  return (
    <>
      {usersProfileResponse.isLoading && <p>Loading</p>}
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
          <Pagination count={10} color="primary" />
        </Stack>
      </Grid>
    </>
  );
};

export default SeachPage;
