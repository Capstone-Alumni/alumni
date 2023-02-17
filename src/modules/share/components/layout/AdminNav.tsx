'use client';

import { Icon } from '@iconify/react';

import {
  Avatar,
  Box,
  IconButton,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ACCESS_NAV_ITEM = {
  id: 'request_access',
  title: 'Kiểm duyệt',
  icon: 'grommet-icons:validate',
  link: '/admin/access_request',
};

const NEWS_NAV_ITEM = {
  id: 'news',
  title: 'Tin tức',
  icon: 'fluent:news-16-filled',
  link: '/admin/news',
};
const EVENT_NAV_ITEM = {
  id: 'event',
  title: 'Sự kiện',
  icon: 'ic:baseline-event',
  link: '/admin/event',
};

const GRADE_NAV_ITEM = {
  id: 'grade_class',
  title: 'Niên khoá và Lớp',
  icon: 'material-symbols:meeting-room-outline-rounded',
  link: '/admin/grade',
};
const USER_NAV_ITEM = {
  id: 'user',
  title: 'Cựu học sinh',
  icon: 'ph:student-bold',
  link: '/admin/members',
};

const StyledSidebar = styled(Box)(() => ({
  height: '100vh',
  width: '20rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  overflowY: 'auto',
}));

const StyledNavWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(4),
  gap: theme.spacing(3),
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const StyledNav = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledNavItem = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),

  borderRadius: theme.spacing(2),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledFooter = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledAccountWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(0),
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: theme.palette.primary.contrastText,
}));

const generateNavItems = (
  role: 'ALUMNI' | 'CLASS_MOD' | 'GRADE_MOD' | 'SCHOOL_ADMIN',
) => {
  switch (role) {
    case 'ALUMNI':
      return [];
    case 'CLASS_MOD':
      return [ACCESS_NAV_ITEM, EVENT_NAV_ITEM];
    case 'GRADE_MOD':
      return [ACCESS_NAV_ITEM, EVENT_NAV_ITEM, NEWS_NAV_ITEM];
    case 'SCHOOL_ADMIN':
      return [
        ACCESS_NAV_ITEM,
        NEWS_NAV_ITEM,
        EVENT_NAV_ITEM,
        GRADE_NAV_ITEM,
        USER_NAV_ITEM,
      ];
  }
};

const AdminNav = ({ user, tenant }: { user?: any; tenant: any }) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledSidebar>
        <StyledNavWrapper>
          <StyledHeader
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <Typography variant="h5" sx={{ ml: theme.spacing(1) }}>
                {tenant?.name}
              </Typography>
            </Box>
          </StyledHeader>

          <StyledNav>
            {generateNavItems(user.accessLevel).map(item => {
              const isActive = item.link && pathname?.startsWith(item.link);
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  style={{ color: 'inherit', width: '100%' }}
                >
                  <StyledNavItem
                    sx={{
                      backgroundColor: isActive
                        ? theme.palette.primary.dark
                        : undefined,
                    }}
                  >
                    <Icon height={24} icon={item.icon} />
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Box sx={{ flex: 1 }} />
                    {/* <Icon
                      height={24}
                      icon={
                        isActive
                          ? 'material-symbols:keyboard-arrow-right'
                          : 'material-symbols:keyboard-arrow-down-rounded'
                      }
                    /> */}
                  </StyledNavItem>
                </Link>
              );
            })}
          </StyledNav>
        </StyledNavWrapper>

        <StyledFooter>
          <StyledNav sx={{ padding: 0 }}>
            <Link href="/" style={{ color: 'inherit', width: '100%' }}>
              <StyledNavItem>
                <Icon height={24} icon="majesticons:door-exit" />
                <Typography fontWeight={600}>Thoát bảng điều khiển</Typography>
              </StyledNavItem>
            </Link>
          </StyledNav>

          <StyledAccountWrapper>
            <Avatar src={user.image} />
            <Box>
              <Typography variant="body2">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </Box>

            <IconButton
              sx={{
                position: 'absolute',
                right: 0,
                top: theme.spacing(3),
              }}
            >
              <Icon
                color={theme.palette.primary.contrastText}
                height={32}
                icon="fe:logout"
              />
            </IconButton>
          </StyledAccountWrapper>
        </StyledFooter>
      </StyledSidebar>
    </Box>
  );
};

export default AdminNav;
