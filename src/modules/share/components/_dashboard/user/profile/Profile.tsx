// material
import { Box, Button, Grid, Typography } from '@mui/material';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
//
import ProfileAbout from './ProfileAbout';
import UserCareers from './UserCareers';
import UserEducation from './UserEducation';
import EditIcon from '@mui/icons-material/Edit';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import UserEditWrapper from './UserEditWrapper';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';

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

  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const userInformationData = userInformation?.data?.data;

  const handleToggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  return !!currentUserInformation.userId && !!userProfileId ? (
    <Grid container spacing={3}>
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
                {currentUserInformation.userId === userProfileId && (
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
          {currentUserInformation && userInformationData && (
            <>
              {userCareers?.error ? (
                <Typography>
                  Có lỗi xảy ra! Vui lòng thử lại sau ít phút
                </Typography>
              ) : (
                isAllowToViewValue(
                  currentUserInformation,
                  userInformationData,
                  userInformationData.careerPublicity,
                ) && (
                  <Grid item xs={12} md={12}>
                    <UserCareers
                      editable={false}
                      userCareers={userCareers?.data?.data?.items}
                      userInformationData={userInformationData}
                      currentUser={currentUserInformation}
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
                  currentUserInformation,
                  userInformationData,
                  userInformationData.educationPublicity,
                ) && (
                  <Grid item xs={12} md={12}>
                    <UserEducation
                      editable={false}
                      userEducations={userEducations?.data?.data?.items}
                      userInformationData={userInformationData}
                      currentUser={currentUserInformation}
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
              currentUser={currentUserInformation}
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
