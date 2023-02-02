// material
import { Grid, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
//
import ProfileAbout from './ProfileAbout';
import UserCareers from './UserCareers';
import UserEducation from './UserEducation';

// ----------------------------------------------------------------------

type ProfileProps = {
  userInformation?: any;
  userCareers?: any;
  userEducations?: any;
};

export default function Profile({ userInformation, userCareers, userEducations }: ProfileProps) {

  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  const userInformationData = userInformation?.data?.data?.information;

  return (
    <Grid container spacing={3}>
      {userInformation?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <ProfileAbout userInformation={userInformationData} />
        </Stack>
      </Grid>}
      {currentUser.data.information && userInformationData && <>
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
    </Grid>
  );
}
