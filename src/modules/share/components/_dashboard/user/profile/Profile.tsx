// material
import { Grid, Stack } from '@mui/material';
// @types
import { UserPost, Profile as UserProfile } from '../../../../type';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type ProfileProps = {
  myProfile: UserProfile;
  posts: UserPost[];
};

export default function Profile({ myProfile, posts }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>
    </Grid>
  );
}
