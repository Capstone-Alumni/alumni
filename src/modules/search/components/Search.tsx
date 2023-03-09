'use client';

import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from 'src/modules/share/components/SearchInput';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getProfileListParamsAtom } from '../states';
import { useDebounce } from 'use-debounce';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';
import { getGradeListParamsAtom } from 'src/modules/gradeAndClass/state';
import useGetClassListV2 from 'src/modules/gradeAndClass/hooks/useGetClassListV2';

const Seach = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { name } = params;
  const [search, setSearch] = useState<string>(name ?? '');
  const [gradeParam, setGradeParam] = useState('');
  const [classParam, setClassParam] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<null | {
    id: string;
    label: string;
  }>(null);
  const [selectedClass, setSelectedClass] = useState<null | {
    id: string;
    label: string;
  }>(null);

  const setGradeParams = useSetRecoilState(getGradeListParamsAtom);
  const { data: gradeList, isLoading: isLoadingGrade } = useGetGradeList();
  const { data: classList, getClassList } = useGetClassListV2();

  const [gradeDebounce] = useDebounce(gradeParam, 2000);

  useEffect(() => {
    setGradeParams(prevParams => ({
      ...prevParams,
      name: gradeDebounce,
      code: gradeDebounce,
    }));
  }, [gradeDebounce]);

  useEffect(() => {
    if (!selectedGrade) {
      return;
    }

    getClassList({ gradeId: selectedGrade.id, name: '' });
    setSelectedClass(null);
    setParams(prev => ({ ...prev, gradeId: selectedGrade.id, classId: '' }));
  }, [selectedGrade]);

  useEffect(() => {
    if (!selectedClass) {
      return;
    }

    setParams(prev => ({ ...prev, classId: selectedClass.id }));
  }, [selectedClass]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setParams(prev => ({ ...prev, name: search }));
  };

  const handleSearchOnChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <Grid
      container
      spacing={3}
      maxWidth="md"
      sx={{ width: '100%', margin: 'auto' }}
    >
      <Box sx={{ width: '100%', margin: '0 0 0 1.25rem' }}>
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: theme.spacing(2) }}
        >
          <SearchInput
            placeholder="Tìm kiếm bạn học"
            value={search}
            onChange={handleSearchOnChange}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>

        <Stack direction={{ sm: 'column', md: 'row' }} gap={2}>
          <Autocomplete
            value={selectedGrade}
            onChange={(event, newValue) => {
              setSelectedGrade(newValue);
            }}
            inputValue={gradeParam}
            onInputChange={(e, newValue) => setGradeParam(newValue)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            options={
              gradeList
                ? gradeList?.data.items.map(grade => ({
                    id: grade.id,
                    label: grade.code,
                    value: grade.id,
                  }))
                : []
            }
            renderInput={params => (
              <TextField
                {...params}
                size="small"
                label="Khối"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoadingGrade ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            sx={{ minWidth: '150px' }}
          />

          <Autocomplete
            value={selectedClass}
            onChange={(event, newValue) => {
              setSelectedClass(newValue);
            }}
            inputValue={classParam}
            onInputChange={(e, newValue) => setClassParam(newValue)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            options={
              classList
                ? classList?.data.items.map(cl => ({
                    id: cl.id,
                    label: cl.name,
                  }))
                : []
            }
            renderInput={params => (
              <TextField {...params} size="small" label="Lớp" />
            )}
            sx={{ minWidth: '150px' }}
          />
        </Stack>
      </Box>
    </Grid>
  );
};

export default Seach;
