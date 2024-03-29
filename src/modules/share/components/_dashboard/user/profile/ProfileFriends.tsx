import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { styled } from '@mui/material';
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Tooltip,
  Typography,
} from '@mui/material';
// @types
import { Friend } from '../../../../type';
//
import SearchNotFound from '../../../SearchNotFound';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  marginBottom: theme.spacing(5),
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

function applyFilter(array: Friend[], query: string) {
  let arr = array;
  if (query) {
    arr = filter(
      array,
      _friend => _friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return arr;
}

function FriendCard({ friend }: { friend: Friend }) {
  const { name, role, avatarUrl } = friend;

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ width: 64, height: 64, mb: 3 }}
      />
      <Link variant="subtitle1" color="text.primary" component={'a'}>
        {name}
      </Link>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        {SOCIALS.map(social => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>
      <IconButton
        sx={{
          top: 8,
          right: 8,
          position: 'absolute',
        }}
      >
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
    </Card>
  );
}

type ProfileFriendsProps = {
  friends: Friend[];
  findFriends: string;
  onFindFriends: (value: string) => void;
};

export default function ProfileFriends({
  friends,
  findFriends,
  onFindFriends,
}: ProfileFriendsProps) {
  const friendFiltered = applyFilter(friends, findFriends);
  const isNotFound = friendFiltered.length === 0;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <SearchStyle
        value={findFriends}
        onChange={e => onFindFriends(e.target.value)}
        placeholder="Find friends..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: 'text.disabled' }}
            />
          </InputAdornment>
        }
      />

      <Grid container spacing={3}>
        {friendFiltered.map(friend => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  );
}
