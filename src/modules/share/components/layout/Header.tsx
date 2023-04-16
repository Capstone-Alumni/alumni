'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from '@share/components/NextLinkV2';
import Logo from '../Logo';
import { Divider, useScrollTrigger, useTheme } from '@mui/material';
import { NavItem } from './NavItem';
import HeaderUserOptions from './HeaderUserOption';
import React, { useMemo } from 'react';
import { User } from 'next-auth';
import { currentUserInformationDataAtom, Tenant } from '@share/states';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  hasAnimation: boolean;
  disabledColorChange: boolean;
}

function ElevationScroll(props: Props) {
  const { children, window, hasAnimation, disabledColorChange } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger || !hasAnimation ? 4 : 0,
    sx: {
      backgroundColor: trigger || !hasAnimation ? '#fff' : 'transparent',
      color:
        trigger || !hasAnimation || disabledColorChange ? 'inherit' : '#fff',
    },
  });
}

const Header = ({ user, tenant }: { user?: User; tenant?: Tenant }) => {
  const theme = useTheme();
  const currentUserInformationData = useRecoilValue(
    currentUserInformationDataAtom,
  );

  const pathname = usePathname();

  const hasAnimation = useMemo(
    () =>
      pathname === '/' || pathname === '/sign_up' || pathname === '/sign_in',
    [pathname],
  );
  const hidden = useMemo(() => pathname?.startsWith('/admin'), [pathname]);
  const disabledColorChange = useMemo(
    () => pathname === '/sign_up' || pathname === '/sign_in',
    [pathname],
  );

  return hidden ? null : (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll
        hasAnimation={hasAnimation}
        disabledColorChange={disabledColorChange}
      >
        <AppBar color="inherit">
          <Toolbar>
            <Link href="/">
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Logo
                  url={tenant?.logo}
                  sx={{ borderRadius: '8px', overflow: 'hidden' }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  color="primary"
                  textTransform="capitalize"
                >
                  {tenant?.name}
                </Typography>
              </Box>
            </Link>
            <Typography variant="h6" component="div" color="primary">
              {tenant?.name}
            </Typography>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ marginX: theme.spacing(2), opacity: '0' }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: theme.spacing(2),
              }}
            >
              <NavItem label="Tin tức" href="/news" />
              {user ? (
                <>
                  <NavItem label="Sự kiện" href="/events/discover" />
                  <NavItem label="Tuyển dụng" href="/recruitments/discover" />
                  <NavItem label="Gây quỹ" href="/funds/going" />
                  <NavItem label="Bạn bè" href="/social" />
                </>
              ) : null}
            </Box>

            <Box sx={{ flex: 1 }} />

            {user &&
            (user.isOwner || currentUserInformationData?.gradeMod?.length) ? (
              <Link
                href="/admin/access/access_request"
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
              <>
                <Link
                  href="/sign_in"
                  style={{ color: 'inherit', marginRight: theme.spacing(2) }}
                >
                  <Button color="primary" variant="contained" role="href">
                    Đăng nhập
                  </Button>
                </Link>

                <Link href="/sign_up" style={{ color: 'inherit' }}>
                  <Button color="primary" variant="outlined" role="href">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
