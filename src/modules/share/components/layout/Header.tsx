'use client';

import { signOut } from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Logo from '../Logo';
import { Divider, useTheme } from '@mui/material';
import SearchInput from '../SearchInput';
import { NavItem } from './NavItem';
import MyAvatar from '../MyAvatar';
import HeaderUserOptions from './HeaderUserOption';

const Header = ({ user, tenant }: { user?: any; tenant?: any }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div">
            {tenant?.name}
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginX: theme.spacing(2) }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(2),
            }}
          >
            <NavItem label="Tin tức" href="/news" />
            <NavItem label="Sự kiện" href="/events" />
          </Box>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ mr: theme.spacing(2) }}>
            <SearchInput placeholder="Tìm kiếm bạn học" />
          </Box>

          {user ? (
            <HeaderUserOptions user={user} />
          ) : (
            <Link href="/sign_in">
              <Typography color="error">Login</Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
