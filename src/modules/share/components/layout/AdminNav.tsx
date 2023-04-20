'use client';

import { Icon } from '@iconify/react';

import { Box, styled, Typography, useTheme } from '@mui/material';
import { User } from 'next-auth';
import Link from '@share/components/NextLinkV2';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MyAvatar from '../MyAvatar';
import { AdminSubNav, StyledNav, StyledNavItem } from './AdminSubNav';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import Logo from '../Logo';

const ACCESS_NAV_ITEM = {
  id: 'request_access',
  title: 'Đơn xin tham gia',
  icon: 'grommet-icons:validate',
  link: '/admin/config/access_request',
};

const NEWS_NAV_ITEM = {
  id: 'news',
  title: 'Tin tức',
  icon: 'fluent:news-16-filled',
  link: '/admin/action/news',
};
const REPORT_NAV_ITEM = {
  id: 'news',
  title: 'Báo lỗi',
  icon: 'material-symbols:report-outline',
  link: '/admin/action/reports',
};
const FUND_NAV_ITEM = {
  id: 'fund',
  title: 'Quỹ',
  icon: 'ri:refund-2-line',
  link: '/admin/action/funds',
};
const EVENT_NAV_ITEM = {
  id: 'event',
  title: 'Sự kiện',
  icon: 'ic:baseline-event',
  link: '/admin/action/event',
};
const RECRUITMENTS_NAV_ITEM = {
  id: 'recruitments',
  title: 'Tuyển dụng',
  icon: 'ic:baseline-work',
  link: '/admin/action/recruitments',
};

const SCHOOL_NAV_ITEM = {
  id: 'school',
  title: 'Thông tin cơ bản',
  icon: 'bxs:school',
  link: '/admin/config/school',
};
const SCHOOL_VNPAY_NAV_ITEM = {
  id: 'vnpay',
  title: 'Tích hợp VNPay',
  icon: 'ion:wallet',
  link: '/admin/config/vnpay',
};
const GRADE_NAV_ITEM = {
  id: 'grade_class',
  title: 'Niên khoá và Lớp',
  icon: 'material-symbols:meeting-room-outline-rounded',
  link: '/admin/config/grade',
};
const USER_NAV_ITEM = {
  id: 'user',
  title: 'Mời thành viên',
  icon: 'ph:student-bold',
  link: '/admin/config/members',
};

const StyledSidebar = styled(Box)(() => ({
  height: '100vh',
  width: '18rem',

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
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),
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
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(0),
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: theme.palette.primary.contrastText,
}));

const generateNavItems = (
  role?: 'ALUMNI' | 'CLASS_MOD' | 'GRADE_MOD' | 'SCHOOL_ADMIN',
) => {
  switch (role) {
    case 'ALUMNI':
      return [];
    case 'CLASS_MOD':
      return [];
    case 'GRADE_MOD':
      return [EVENT_NAV_ITEM, FUND_NAV_ITEM];
    case 'SCHOOL_ADMIN':
      return [
        NEWS_NAV_ITEM,
        EVENT_NAV_ITEM,
        FUND_NAV_ITEM,
        RECRUITMENTS_NAV_ITEM,
        REPORT_NAV_ITEM,
      ];
    default:
      return [];
  }
};

const generateSchoolNavItems = (
  role?: 'ALUMNI' | 'CLASS_MOD' | 'GRADE_MOD' | 'SCHOOL_ADMIN',
) => {
  switch (role) {
    case 'ALUMNI':
      return [];
    case 'CLASS_MOD':
      return [USER_NAV_ITEM, ACCESS_NAV_ITEM];
    case 'GRADE_MOD':
      return [GRADE_NAV_ITEM, USER_NAV_ITEM, ACCESS_NAV_ITEM];
    case 'SCHOOL_ADMIN':
      return [
        SCHOOL_NAV_ITEM,
        SCHOOL_VNPAY_NAV_ITEM,
        GRADE_NAV_ITEM,
        USER_NAV_ITEM,
        ACCESS_NAV_ITEM,
      ];
    default:
      return [];
  }
};

const AdminNav = ({ user, tenant }: { user?: User; tenant: any }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const defaultSection = pathname?.split('/')[2];
  const [sectionSelected, setSectionSelected] = useState(defaultSection);

  const currentUser = useRecoilValue(currentUserInformationDataAtom);

  const schoolItems = generateSchoolNavItems('SCHOOL_ADMIN'); // fix
  const navItems = generateNavItems('SCHOOL_ADMIN'); // fix

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ position: 'fixed' }}>
      <StyledSidebar>
        <StyledNavWrapper>
          <StyledHeader
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo
                url={tenant?.logo}
                sx={{ borderRadius: '8px', overflow: 'hidden' }}
              />
              <Typography
                variant="h5"
                sx={{ ml: theme.spacing(1), textTransform: 'capitalize' }}
              >
                {tenant?.name}
              </Typography>
            </Box>
          </StyledHeader>

          {schoolItems && schoolItems.length ? (
            <AdminSubNav
              title="Cấu hình trường"
              items={schoolItems}
              open={sectionSelected === 'config'}
              onToggle={() =>
                setSectionSelected((prevState) =>
                  prevState === 'config' ? '' : 'config',
                )
              }
            />
          ) : null}

          {navItems && navItems.length ? (
            <AdminSubNav
              title="Hoạt động"
              items={navItems}
              open={sectionSelected === 'action'}
              onToggle={() =>
                setSectionSelected((prevState) =>
                  prevState === 'action' ? '' : 'action',
                )
              }
            />
          ) : null}
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
            <MyAvatar
              photoUrl={currentUser?.information?.avatarUrl}
              displayName={currentUser?.information?.fullName}
            />
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {user.email}
            </Typography>

            <Box sx={{ flex: 1 }} />

            {/* <Tooltip title="Thoát bảng điều khiển">
              <Link href="/" style={{ color: 'inherit' }}>
                <Icon
                  color={theme.palette.primary.contrastText}
                  height={32}
                  icon="fe:logout"
                />
              </Link>
            </Tooltip> */}
          </StyledAccountWrapper>
        </StyledFooter>
      </StyledSidebar>
    </Box>
  );
};

export default AdminNav;
