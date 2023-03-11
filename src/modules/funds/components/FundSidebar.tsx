'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';

const StyledNavWrapper = styled(Box)(({ theme }) => ({
  minWidth: '16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
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
    color: theme.palette.primary.main,
  },
}));

const FUND_NAV_ITEMS = [
  {
    id: 'ongoing',
    title: 'Đang gây quỹ',
    icon: 'carbon:checkmark-filled',
    link: '/funds/going',
  },
  {
    id: 'ended',
    title: 'Đã kết thúc',
    icon: 'uil:trash-alt',
    link: '/funds/ended',
  },
  {
    id: 'interest',
    title: 'Đã Lưu',
    icon: 'material-symbols:bookmark',
    link: '/funds/saved',
  },
];

const FUND_HOSTING_NAV_ITEM = {
  id: 'hosting',
  title: 'Của tôi',
  icon: 'material-symbols:person-pin',
  link: '/funds/hosting',
};

const FundSidebar = ({ user }: { user: User }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isAlumni = user.accessLevel === 'ALUMNI';

  return (
    <StyledNavWrapper>
      <StyledNav>
        {FUND_NAV_ITEMS.map(item => {
          const isActive = item.link && pathname?.startsWith(item.link);
          return (
            <Link
              key={item.id}
              href={item.link}
              style={{ color: 'inherit', width: '100%' }}
              prefetch={false}
            >
              <StyledNavItem
                sx={{
                  backgroundColor: isActive
                    ? theme.palette.primary.lighter
                    : undefined,
                  color: isActive ? theme.palette.primary.main : undefined,
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

        {/* {isAlumni ? null : (
          <Link
            href={FUND_HOSTING_NAV_ITEM.link}
            style={{ color: 'inherit', width: '100%' }}
            prefetch={false}
          >
            <StyledNavItem
              sx={{
                backgroundColor:
                  FUND_HOSTING_NAV_ITEM.link &&
                  pathname?.startsWith(FUND_HOSTING_NAV_ITEM.link)
                    ? theme.palette.primary.lighter
                    : undefined,
                color:
                  FUND_HOSTING_NAV_ITEM.link &&
                  pathname?.startsWith(FUND_HOSTING_NAV_ITEM.link)
                    ? theme.palette.primary.main
                    : undefined,
              }}
            >
              <Icon height={24} icon={FUND_HOSTING_NAV_ITEM.icon} />
              <Typography fontWeight={600}>
                {FUND_HOSTING_NAV_ITEM.title}
              </Typography>
              <Box sx={{ flex: 1 }} />
            </StyledNavItem>
          </Link>
        )} */}

        {/* {isAlumni ? null : (
          <Link href="/funds/create" style={{ width: '100%' }} prefetch={false}>
            <Button variant="contained" fullWidth startIcon={<AddIcon />}>
              tạo quỹ
            </Button>
          </Link>
        )} */}
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default FundSidebar;
