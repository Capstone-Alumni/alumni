'use client';

import { Icon } from '@iconify/react';
import {
  alpha,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MyAvatar from '../MyAvatar';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Box } from '@mui/material';
import getRoleName from '@share/utils/getRoleName';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import { User } from 'next-auth';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1),
  padding: '0.25rem',
  borderRadius: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const HeaderUserOptions = ({ user }: { user?: User }) => {
  const theme = useTheme();
  const router = useRouter();

  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Wrapper
        id="header-user-option"
        aria-controls={open ? 'header-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2">{user?.email}</Typography>
          <Typography variant="caption" color="warning">
            {getRoleName(user?.accessLevel || 'ALUMNI')}
          </Typography>
        </Box>
        <MyAvatar
          displayName={currentUserInformation?.fullName}
          photoUrl={currentUserInformation?.avatarUrl}
        />
      </Wrapper>
      <Menu
        id="header-user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'header-user-option',
        }}
      >
        <Link
          href={`/profile/${user?.id}?profile_tab=information`}
          style={{ color: 'inherit' }}
        >
          <MenuItem>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText>Hồ sơ của tôi</ListItemText>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={async () => {
            await signOut({ redirect: false });
            router.push('/');
          }}
        >
          <ListItemIcon>
            <Icon
              color={theme.palette.common.black}
              height={24}
              icon="fe:logout"
            />
          </ListItemIcon>
          <ListItemText>Đăng xuất</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUserOptions;
