'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
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

const POST_NAV_ITEMS = [
  {
    id: 'school',
    title: 'Tất cả',
    icon: 'material-symbols:globe-asia-sharp',
  },
  {
    id: 'school',
    title: 'Toàn trường',
    icon: 'carbon:checkmark-filled',
  },
  {
    id: 'grade',
    title: 'Niên khoá của tôi',
    icon: 'material-symbols:bookmark',
  },
  {
    id: 'class',
    title: 'Lớp của tôi',
    icon: 'material-symbols:person-pin',
  },
];

const PostSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <StyledNavWrapper>
      <StyledNav>
        {POST_NAV_ITEMS.map(item => {
          const isActive = false;

          return (
            <StyledNavItem
              key={item.id}
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
          );
        })}
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default PostSidebar;
