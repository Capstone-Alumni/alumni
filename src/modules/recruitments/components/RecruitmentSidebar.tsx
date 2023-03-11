'use client';

import { Icon } from '@iconify/react';
import { Button, Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
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
    link: '/recruitments/discover',
  },
  {
    id: 'job_posted',
    title: 'Công việc đã đăng',
    icon: 'material-symbols:person-pin',
    link: '/recruitments/posted_jobs',
  },
];

const RecruitmentSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <StyledNavWrapper>
      <StyledNav>
        {EVENT_NAV_ITEMS.map((item) => {
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
              </StyledNavItem>
            </Link>
          );
        })}

        <Link href="/recruitments/create" style={{ width: '100%' }}>
          <Button variant="contained" fullWidth startIcon={<AddIcon />}>
            tạo công việc
          </Button>
        </Link>
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default RecruitmentSidebar;
