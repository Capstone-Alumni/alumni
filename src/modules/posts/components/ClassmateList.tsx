import { Stack, Typography } from '@mui/material';
import MyAvatar from '@share/components/MyAvatar';
import { currentUserInformationDataAtom } from '@share/states';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useGetInformationSameClassList from '../hooks/useGetInformationSameClassList';

const ClassmateList = () => {
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const { fetchApi, data } = useGetInformationSameClassList();

  useEffect(() => {
    if (currentUserInformation?.alumClassId) {
      fetchApi({
        page: 1,
        limit: 10,
        classId: currentUserInformation?.alumClassId,
      });
    }
  }, [currentUserInformation?.alumClassId]);

  return (
    <Stack direction="column" gap={1} sx={{ minWidth: '16rem', px: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography fontWeight={600} color="GrayText">
          Bạn cùng lớp
        </Typography>
        <Link href="/find">
          <Typography fontWeight={600}>Xem thêm</Typography>
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
