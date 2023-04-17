'use client';

import { Box, Grid, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from 'src/modules/share/components/SearchInput';
import { useRecoilState } from 'recoil';
import { getProfileListParamsAtom } from '../states';
import { useSearchParams } from 'next/navigation';

const Search = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { name } = params;
  const [search, setSearch] = useState<string>(name ?? '');

  const searchParam = useSearchParams();
  const gradeSearchParams = searchParam.get('grade') || 'all';
  const classSearchParams = searchParam.get('class') || 'all';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setParams(prev => ({
      ...prev,
      name: search,
    }));
  };

  const handleSearchOnChange = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setParams(prev => ({
      ...prev,
      gradeId: gradeSearchParams,
      classId: classSearchParams,
    }));
  }, [gradeSearchParams, classSearchParams]);

  return (
    <Grid container maxWidth="md" sx={{ width: '100%', margin: 'auto' }}>
      <Box sx={{ width: '100%', margin: '0 0 0 0.5rem' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(1),
          }}
        >
          <SearchInput
            placeholder="Tìm kiếm bạn học"
            value={search}
            onChange={handleSearchOnChange}
          />
          <button type="submit" style={{ display: 'none' }}></button>
          {/* <Button variant="outlined" type="submit">
            Tìm
          </Button> */}
        </form>
      </Box>
    </Grid>
  );
};

export default Search;
