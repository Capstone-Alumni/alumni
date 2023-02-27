'use client';

import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PublicIcon from '@mui/icons-material/Public';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { getPostListParams, postListAtom } from '../state';

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
  const [params, setParams] = useRecoilState(getPostListParams);
  const resetPostList = useResetRecoilState(postListAtom);

  const { all, myGrade, myClass } = params;

  return (
    <StyledNavWrapper>
      <StyledNav>
        <StyledNavItem
          onClick={() => {
            resetPostList();
            setParams({
              page: 1,
              limit: 4,
              all: true,
              myGrade: false,
              myClass: false,
            });
          }}
          sx={
            all
              ? {
                  backgroundColor: theme.palette.primary.lighter,
                  color: theme.palette.primary.main,
                }
              : undefined
          }
        >
          <PublicIcon />
          <Typography fontWeight={600}>Tất cả</Typography>
          <Box sx={{ flex: 1 }} />
        </StyledNavItem>

        <StyledNavItem
          onClick={() => {
            resetPostList();
            setParams({
              page: 1,
              limit: 4,
              all: false,
              myGrade: true,
              myClass: false,
            });
          }}
          sx={
            myGrade
              ? {
                  backgroundColor: theme.palette.primary.lighter,
                  color: theme.palette.primary.main,
                }
              : undefined
          }
        >
          <Diversity3Icon />
          <Typography fontWeight={600}>Niên khoá của tôi</Typography>
          <Box sx={{ flex: 1 }} />
        </StyledNavItem>

        <StyledNavItem
          onClick={() => {
            resetPostList();
            setParams({
              page: 1,
              limit: 4,
              all: false,
              myGrade: false,
              myClass: true,
            });
          }}
          sx={
            myClass
              ? {
                  backgroundColor: theme.palette.primary.lighter,
                  color: theme.palette.primary.main,
                }
              : undefined
          }
        >
          <GroupIcon />
          <Typography fontWeight={600}>Lớp của tôi</Typography>
          <Box sx={{ flex: 1 }} />
        </StyledNavItem>
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default PostSidebar;
