// material
import { Grid, Stack } from '@mui/material';
// @types
import { Profile as UserProfile, UserPost } from '../../../../type';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type ProfileProps = {
  myProfile: UserProfile;
  posts: UserPost[];
};

export default function Profile({ myProfile, posts }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>
    </Grid>
  );
}
