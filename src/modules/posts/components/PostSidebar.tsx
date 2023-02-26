'use client';

import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PublicIcon from '@mui/icons-material/Public';

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
    icon: <PublicIcon />,
  },
  {
    id: 'school',
    title: 'Toàn trường',
    icon: <HomeWorkIcon />,
  },
  {
    id: 'grade',
    title: 'Niên khoá của tôi',
    icon: <Diversity3Icon />,
  },
  {
    id: 'class',
    title: 'Lớp của tôi',
    icon: <GroupIcon />,
  },
];

const PostSidebar = () => {
  const theme = useTheme();

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
              {item.icon}
              <Typography fontWeight={600}>{item.title}</Typography>
              <Box sx={{ flex: 1 }} />
            </StyledNavItem>
          );
        })}
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default PostSidebar;
