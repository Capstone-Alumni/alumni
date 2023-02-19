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
    id: 'discover',
    title: 'Khám phá',
    icon: 'material-symbols:globe-asia-sharp',
    link: '/funds/discover',
  },
  {
    id: 'interest',
    title: 'Lưu',
    icon: 'material-symbols:bookmark',
    link: '/funds/interest',
  },
  {
    id: 'hosting',
    title: 'Của tôi',
    icon: 'material-symbols:person-pin',
    link: '/funds/hosting',
  },
];

const FundSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();

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

        <Link href="/funds/create" style={{ width: '100%' }}>
          <Button variant="contained" fullWidth startIcon={<AddIcon />}>
            tạo quỹ
          </Button>
        </Link>
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default FundSidebar;
