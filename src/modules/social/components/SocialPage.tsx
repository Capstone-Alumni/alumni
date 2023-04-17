'use client';

import { MenuItem, Stack, Tab, Tabs, TextField, useTheme } from '@mui/material';
import SocialSidebar from './SocialSidebar';
import { useSearchParams } from 'next/navigation';
import useSetSearchParams from '@share/hooks/useSetSearchParams';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import { useState } from 'react';
import AddPostButton from 'src/modules/posts/components/AddPostButton';
import PostList from 'src/modules/posts/components/PostList';
import Search from 'src/modules/search/components/Search';
import SeachPage from 'src/modules/search/components/SearchResults';

const SocialPage = () => {
  const [tabKey, setTabKey] = useState<'post' | 'member' | 'request'>('post');

  const theme = useTheme();

  const searchParam = useSearchParams();
  const gradeSearchParams = searchParam.get('grade') || 'all';
  const classSearchParams = searchParam.get('class') || 'all';
  const { setSearchParams } = useSetSearchParams();

  const currentUserInformationData = useRecoilValue(
    currentUserInformationDataAtom,
  );

  const getClassOption = () => {
    return [{ id: 'all', label: 'Tất cả lớp', value: 'all' }]
      .concat(
        currentUserInformationData?.alumniToClass
          ?.filter(item => item.alumClass.gradeId === gradeSearchParams)
          ?.map(item => ({
            id: item.alumClassId,
            label: item.alumClass.name,
            value: item.alumClassId,
          })) || [],
      )
      .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i); // remove duplicates
  };

  return (
    <Stack
      direction={{ sm: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <SocialSidebar />

      <Stack
        direction="column"
        gap={2}
        sx={{
          width: '100%',
          [theme.breakpoints.down('md')]: { width: '100%' },
        }}
      >
        {gradeSearchParams === 'all' ? null : (
          <TextField
            size="small"
            value={classSearchParams}
            onChange={e =>
              setSearchParams([
                { key: 'grade', value: gradeSearchParams },
                { key: 'class', value: e.target.value },
              ])
            }
            select
            type="select"
          >
            {getClassOption()?.map(op => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        <Tabs
          value={tabKey}
          onChange={(_, key) => setTabKey(key)}
          aria-label="wrapped tabs"
        >
          <Tab value="post" label="Bài đăng" />
          <Tab value="member" label="Thành viên" />
        </Tabs>

        {tabKey === 'post' ? (
          <>
            <AddPostButton />
            <PostList />
          </>
        ) : null}

        {tabKey === 'member' ? (
          <>
            <Search />
            <SeachPage />
          </>
        ) : null}
        {/* <AddPostButton />

        <PostList /> */}
      </Stack>
    </Stack>
  );
};

export default SocialPage;
