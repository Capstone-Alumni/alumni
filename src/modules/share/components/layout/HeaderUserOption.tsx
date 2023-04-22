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
import Link from '@share/components/NextLinkV2';
import { Box } from '@mui/material';
import { Alumni, currentUserInformationDataAtom } from '@share/states';
import getRoleName from '@share/utils/getRoleName';
import { useSetRecoilState } from 'recoil';

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

const HeaderUserOptions = ({
  user: currentUserInformation,
}: {
  user: Alumni;
}) => {
  const theme = useTheme();
  const router = useRouter();

  const setUser = useSetRecoilState(currentUserInformationDataAtom);

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
      {currentUserInformation ? (
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
              <Typography variant="subtitle2">
                {currentUserInformation?.information?.fullName}
              </Typography>
              <Typography variant="caption" color="warning">
                {getRoleName(currentUserInformation)}
              </Typography>
            </Box>
            <MyAvatar
              displayName={currentUserInformation?.information?.fullName}
              photoUrl={currentUserInformation?.information?.avatarUrl}
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
              href={`/profile/${currentUserInformation?.id}`}
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
                setUser(null);
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
      ) : null}
    </>
  );
};

export default HeaderUserOptions;
