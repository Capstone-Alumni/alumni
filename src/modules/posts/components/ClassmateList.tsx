import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import MyAvatar from '@share/components/MyAvatar';
import Link from 'next/link';
import { useEffect } from 'react';
import useGetInformationSameClassList from '../hooks/useGetInformationSameClassList';

const ClassmateList = () => {
  const currentUserInformation = useAppSelector(
    (state: RootState) => state.currentUser,
  );
  const { fetchApi, data } = useGetInformationSameClassList();

  useEffect(() => {
    if (currentUserInformation.data.alumClassId) {
      fetchApi({
        page: 1,
        limit: 10,
        classId: currentUserInformation.data.alumClassId,
      });
    }
  }, [currentUserInformation?.data.alumClassId]);

  return (
    <Stack direction="column" gap={1} sx={{ minWidth: '16rem', px: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography fontWeight={600} color="GrayText">
          Bạn cùng lớp
        </Typography>
        <Link href="/find">
          <Typography fontWeight={600}>Tìm thêm</Typography>
        </Link>
      </Stack>

      {data?.data.items.map(item => (
        <Link
          key={item.id}
          href={`/profile/${item.id}?profile_tab=information`}
          style={{ color: 'inherit' }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <MyAvatar />
            <Typography variant="body2" fontWeight={600}>
              {item.fullName}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default ClassmateList;
