'use client';

import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from 'src/modules/share/components/SearchInput';
import { useRecoilState } from 'recoil';
import { getProfileListParamsAtom } from '../states';

const Seach = () => {
  const [params, setParams] = useRecoilState(getProfileListParamsAtom);
  const { name } = params;
  const [search, setSearch] = useState<string>(name ?? '');

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
        <form onSubmit={handleSubmit}>
          <SearchInput
            placeholder="Tìm kiếm bạn học"
            value={search}
            onChange={handleSearchOnChange}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </Box>
    </Grid>
  );
};

export default Seach;
