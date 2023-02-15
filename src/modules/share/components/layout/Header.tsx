'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from 'next/link';
import Logo from '../Logo';
import { Divider, useScrollTrigger, useTheme } from '@mui/material';
import SearchInput from '../SearchInput';
import { NavItem } from './NavItem';
import HeaderUserOptions from './HeaderUserOption';
import React from 'react';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? '#fff' : 'transparent',
      color: trigger ? 'inherit' : '#fff',
    },
  });
}

const Header = ({ user, tenant }: { user?: any; tenant?: any }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar
        // color="inherit"
        // sx={{ backgroundColor: 'inherit' }}
        // elevation={0}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Logo />
            </IconButton>
            <Typography variant="h6" component="div" color="primary">
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
              {user ? <NavItem label="Sự kiện" href="/events" /> : null}
            </Box>

            <Box sx={{ flex: 1 }} />

            {user ? (
              <Box sx={{ mr: theme.spacing(2) }}>
                <SearchInput placeholder="Tìm kiếm bạn học" />
              </Box>
            ) : null}

            {user.accessLevel !== 'ALUMNI' ? (
              <Link
                href="/admin/access_request"
                style={{ color: 'inherit', marginRight: theme.spacing(2) }}
              >
                <Button
                  startIcon={<AdminPanelSettingsIcon />}
                  variant="contained"
                  color="warning"
                >
                  Bảng điều khiển
                </Button>
              </Link>
            ) : null}

            {user ? (
              <HeaderUserOptions user={user} />
            ) : (
              <Link href="/sign_in" style={{ color: 'inherit' }}>
                <Button color="primary" variant="contained" role="href">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
