// material
import { Grid, Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
// @types
import { UserPost, Profile as UserProfile } from '../../../../type';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
import UserCareers from './UserCareers';
import UserEducation from './UserEducation';

// ----------------------------------------------------------------------

type ProfileProps = {
  userInformation?: any;
  userCareers?: any;
  userEducations?: any;
};

export default function Profile({ userInformation, userCareers, userEducations }: ProfileProps) {

  const session = useSession();

  return (
    <Grid container spacing={3}>
      {userInformation?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <ProfileAbout userInformation={userInformation?.data?.data?.information} />
        </Stack>
      </Grid>}
      {session.data?.user && userInformation?.data?.data?.information && <>
        {userCareers?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
          {isAllowToViewValue(session.data.user.accessLevel, userInformation?.data?.data?.information.careerPublicity) && <Stack spacing={3}>
            <UserCareers editable={false} userCareers={userCareers?.data?.data?.items} />
          </Stack>}
        </Grid>}
        {userEducations?.error ? <Typography>Có lỗi xảy ra! Vui lòng thử lại sau ít phút</Typography> : <Grid item xs={12} md={12}>
          {isAllowToViewValue(session.data.user.accessLevel, userInformation?.data?.data?.information.educationPublicity) && <Stack spacing={3}>
            <UserEducation editable={false} userEducations={userEducations?.data?.data?.items} />
          </Stack>}
        </Grid>}
      </>}
    </Grid>
  );
}
