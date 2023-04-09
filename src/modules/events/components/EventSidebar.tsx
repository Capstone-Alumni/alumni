'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import Link from '@share/components/NextLinkV2';
import { usePathname } from 'next/navigation';

const StyledNavWrapper = styled(Box)(({ theme }) => ({
  minWidth: '16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
}));

const StyledNav = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '5rem',
  left: '4rem',
  minWidth: '16rem',
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

const EVENT_NAV_ITEMS = [
  {
    id: 'discover',
    title: 'Khám phá',
    icon: 'material-symbols:globe-asia-sharp',
    link: '/events/discover',
  },
  {
    id: 'going',
    title: 'Tham dự',
    icon: 'carbon:checkmark-filled',
    link: '/events/going',
  },
  {
    id: 'interest',
    title: 'Quan tâm',
    icon: 'material-symbols:bookmark',
    link: '/events/interest',
  },
  // {
  //   id: 'hosting',
  //   title: 'Của tôi',
  //   icon: 'material-symbols:person-pin',
  //   link: '/events/hosting',
  // },
];

const EventSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <StyledNavWrapper>
      <StyledNav>
        {EVENT_NAV_ITEMS.map(item => {
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

        {/* <Link href="/events/create" style={{ width: '100%' }}>
          <Button variant="contained" fullWidth startIcon={<AddIcon />}>
            tạo sự kiện
          </Button>
        </Link> */}
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default EventSidebar;
