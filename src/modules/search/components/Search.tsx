'use client';

import { Box, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from 'src/modules/share/components/SearchInput';

const Seach = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [search, setSearch] = useState<string>(name ?? '');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/find?name=${search}`);
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
      <Box sx={{ width: '100%' }}>
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
