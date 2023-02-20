// material
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
//
import ProfileAbout from './ProfileAbout';
import UserCareers from './UserCareers';
import UserEducation from './UserEducation';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import UserEditWrapper from './UserEditWrapper';
import FormDialogs from '@share/components/material-ui/dialog/FormDialogs';
import LoadingIndicator from '@share/components/LoadingIndicator';

// ----------------------------------------------------------------------

type ProfileProps = {
  userProfileId: string;
  userInformation?: any;
  userCareers?: any;
  userEducations?: any;
};

export default function Profile({
  userProfileId,
  userInformation,
  userCareers,
  userEducations,
}: ProfileProps) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  const userInformationData = userInformation?.data?.data;

  const handleToggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  return !!currentUser?.data?.userId && !!userProfileId ? (
    <Grid container spacing={3} sx={{ height: '100vh' }}>
      <Box
        display="flex"
        sx={{
          margin: '1.5rem 0 2rem 1.5rem',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      ></Box>
      {!openEdit ? (
        <>
          {userInformation?.error ? (
            <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography>
          ) : (
            <>
              <Box
                display="flex"
                sx={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  width: '100%',
                  marginBottom: '1rem',
                }}
              >
                {currentUser.data.userId === userProfileId && (
                  <Button
                    variant="outlined"
                    startIcon={openEdit ? <BackIcon /> : <EditIcon />}
                    onClick={handleToggleEdit}
                  >
                    {openEdit ? 'Quay lại' : 'Chỉnh sửa thông tin'}
                  </Button>
                )}
              </Box>
              <Box display="flex" sx={{ width: '100%', marginLeft: '1.5rem' }}>
                <ProfileAbout userInformation={userInformationData} />
              </Box>
            </>
          )}
          {currentUser.data && userInformationData && (
            <>
              {userCareers?.error ? (
                <Typography>
                  Có lỗi xảy ra! Vui lòng thử lại sau ít phút
                </Typography>
              ) : (
                isAllowToViewValue(
                  currentUser.data,
                  userInformationData,
                  userInformationData.careerPublicity,
                ) && (
                  <Grid item xs={12} md={12}>
                    <UserCareers
                      editable={false}
                      userCareers={userCareers?.data?.data?.items}
                      userInformationData={userInformationData}
                    />
                  </Grid>
                )
              )}
              {userEducations?.error ? (
                <Typography>
                  Có lỗi xảy ra! Vui lòng thử lại sau ít phút
                </Typography>
              ) : (
                isAllowToViewValue(
                  currentUser.data,
                  userInformationData,
                  userInformationData.educationPublicity,
                ) && (
                  <Grid item xs={12} md={12}>
                    <UserEducation
                      editable={false}
                      userEducations={userEducations?.data?.data?.items}
                      userInformationData={userInformationData}
                    />
                  </Grid>
                )
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Box sx={{ paddingLeft: '1.5rem', width: '100%' }}>
            <UserEditWrapper
              userProfileId={userProfileId}
              userInformation={userInformation}
              userCareers={userCareers}
              userEducations={userEducations}
            />
          </Box>
          <Box
            display="flex"
            sx={{
              margin: '1.5rem 0',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              startIcon={openEdit ? <BackIcon /> : <EditIcon />}
              onClick={handleToggleEdit}
            >
              {openEdit ? 'Quay lại' : 'Chỉnh sửa thông tin'}
            </Button>
          </Box>
        </>
      )}
    </Grid>
  ) : (
    <LoadingIndicator />
  );
}
