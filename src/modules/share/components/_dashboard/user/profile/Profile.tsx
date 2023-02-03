// material
import { Button, Grid, Stack, Typography, Card, Box } from '@mui/material';
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

// ----------------------------------------------------------------------

type ProfileProps = {
  userProfileId: string;
  userInformation?: any;
  userCareers?: any;
  userEducations?: any;
};

export default function Profile({ userProfileId, userInformation, userCareers, userEducations }: ProfileProps) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  const userInformationData = userInformation?.data?.data?.information;

  const handleToggleEdit = () => {
    setOpenEdit(!openEdit);
  }
  return (
    <Grid container spacing={3}>
      <Box sx={{ margin: '1.5rem 0 0 0', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', width: "100%" }}>
        <Button variant="outlined" startIcon={openEdit ? <BackIcon /> : <EditIcon />} onClick={handleToggleEdit}>{openEdit ? 'Quay lại' : 'Chỉnh sửa thông tin'}</Button>
      </Box>
      {!openEdit ? <>
        {userInformation?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
          <Stack spacing={3}>
            <ProfileAbout userInformation={userInformationData} />
          </Stack>
        </Grid>}
        {currentUser?.data?.information && userInformationData && <>
          {userCareers?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
            {isAllowToViewValue(currentUser.data.information, userInformationData, userInformationData.careerPublicity) && <Stack spacing={3}>
              <UserCareers editable={false} userCareers={userCareers?.data?.data?.items} />
            </Stack>}
          </Grid>}
          {userEducations?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
            {isAllowToViewValue(currentUser.data.information, userInformationData, userInformationData.educationPublicity) && <Stack spacing={3}>
              <UserEducation editable={false} userEducations={userEducations?.data?.data?.items} />
            </Stack>}
          </Grid>}
        </>}
      </> :
        <>
          <Box sx={{ paddingLeft: '1.5rem', width: '100%' }}>
            <UserEditWrapper userProfileId={userProfileId} userInformation={userInformation} userCareers={userCareers} userEducations={userEducations} />
          </Box>
          <Box sx={{ margin: '1.5rem 0 ', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', width: "100%" }}>
            <Button variant="outlined" startIcon={openEdit ? <BackIcon /> : <EditIcon />} onClick={handleToggleEdit}>{openEdit ? 'Quay lại' : 'Chỉnh sửa thông tin'}</Button>
          </Box></>
      }
    </Grid>
  );
}
