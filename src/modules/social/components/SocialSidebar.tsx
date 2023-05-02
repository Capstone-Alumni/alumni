'use client';

import { Typography } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'next/navigation';
import { currentUserInformationDataAtom } from '@share/states';
import { Grade } from 'src/modules/gradeAndClass/types';
import useSetSearchParams from '@share/hooks/useSetSearchParams';

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
  cursor: 'pointer',

  borderRadius: theme.spacing(2),

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SocialSidebar = () => {
  const theme = useTheme();
  const searchParam = useSearchParams();
  const gradeSearchParams = searchParam.get('grade') || 'all';
  const { setSearchParams } = useSetSearchParams();

  const currentUserInformationData = useRecoilValue(
    currentUserInformationDataAtom,
  );

  const getGradeName = (grade?: Grade) => {
    if (!grade) {
      return '';
    }

    const period = `${grade.startYear} - ${grade.endYear}`;
    return `${grade.code ? grade.code : 'Niên khoá'} ${period}`;
  };

  const getGradeOptions = () => {
    return [{ id: 'all', label: 'Toàn trường' }]
      .concat(
        currentUserInformationData?.alumniToClass?.map(item => ({
          id: item.alumClass.gradeId,
          label: getGradeName(item.alumClass.grade),
        })) || [],
      )
      .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i); // remove duplicates
  };

  return (
    <StyledNavWrapper>
      <StyledNav>
        {getGradeOptions().map(({ id, label }) => (
          <StyledNavItem
            key={id}
            onClick={() =>
              setSearchParams([
                { key: 'grade', value: id },
                { key: 'class', value: 'all' },
              ])
            }
            sx={
              gradeSearchParams === id
                ? {
                    backgroundColor: theme.palette.primary.lighter,
                    color: theme.palette.primary.main,
                  }
                : undefined
            }
          >
            <Typography fontWeight={600}>{label}</Typography>
            <Box sx={{ flex: 1 }} />
          </StyledNavItem>
        ))}
      </StyledNav>
    </StyledNavWrapper>
  );
};

export default SocialSidebar;
