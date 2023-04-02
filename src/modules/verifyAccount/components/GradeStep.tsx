'use client';

import { useDebounce } from 'use-debounce';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Pagination,
  Typography,
  useTheme,
} from '@mui/material';

import { useEffect, useState } from 'react';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';
import { getGradeListParamsAtom } from 'src/modules/gradeAndClass/state';
import { useRecoilState, useResetRecoilState } from 'recoil';
import LoadingIndicator from '@share/components/LoadingIndicator';
import SearchInput from '@share/components/SearchInput';
import { useFormContext } from 'react-hook-form';
import { selectedClassAtom, selectedGradeAtom } from '../states';

const GradeStep = () => {
  const theme = useTheme();
  const [gradeParam, setGradeParam] = useState('');

  const { data: gradeList, isLoading } = useGetGradeList();
  const [params, setParams] = useRecoilState(getGradeListParamsAtom);
  const [selectedGrade, setSelectedGrade] = useRecoilState(selectedGradeAtom);
  const resetSelectedClass = useResetRecoilState(selectedClassAtom);

  const { setValue } = useFormContext();

  const [gradeDebounce] = useDebounce(gradeParam, 2000);

  useEffect(() => {
    setParams(prevParams => ({
      ...prevParams,
      name: gradeDebounce,
      code: gradeDebounce,
    }));
  }, [gradeDebounce]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          margin: '2rem 10vw',
        }}
      >
        <Typography mb={4} variant="h4">
          Chọn niên khoá
        </Typography>

        {selectedGrade ? (
          <Typography variant="h6" sx={{ mb: 2 }}>
            Đã chọn:{' '}
            <Typography
              component="span"
              fontWeight={600}
              fontSize={18}
              color="primary"
            >
              {selectedGrade?.code}
            </Typography>
          </Typography>
        ) : null}

        {isLoading ? <LoadingIndicator /> : null}

        <Box sx={{ mb: 1 }}>
          <SearchInput
            placeholder="Tìm niên khoá của bạn"
            value={gradeParam}
            onChange={e => setGradeParam(e.target.value)}
          />
        </Box>

        <List sx={{ mb: 2 }}>
          <ListItem>
            <ListItemText sx={{ minWidth: theme.spacing(14) }}>
              <Typography fontWeight={600}>Mã</Typography>
            </ListItemText>
          </ListItem>

          {gradeList?.data.items.map(grade => (
            <MenuItem
              key={grade.id}
              onClick={() => {
                setValue('grade', grade.id);
                setSelectedGrade(grade);
                resetSelectedClass();
              }}
            >
              <ListItemText sx={{ minWidth: theme.spacing(14) }}>
                <Typography>{grade.code}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </List>

        <Pagination
          color="primary"
          count={Math.ceil(
            (gradeList?.data?.totalItems || 0) /
              (gradeList?.data?.itemPerPage || 1),
          )}
          page={params.page}
          onChange={(e, value) =>
            setParams(prevParams => ({ ...prevParams, page: value }))
          }
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default GradeStep;
