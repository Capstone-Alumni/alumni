'use client';

import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  CardContent,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { UploadAvatar } from '@share/components/upload';
import { useCanEditProfile } from '../helpers/canEditProfile';
import { setStorage } from 'src/firebase/methods/setStorage';
import { generateUniqSerial } from 'src/utils';
import { toast } from 'react-toastify';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGetUserInformationQuery } from '@redux/slices/userProfileSlice';

const avatarUrlDefault =
  'https://firebasestorage.googleapis.com/v0/b/alumni-pf.appspot.com/o/users%2F6a5e-9e80-43e-cf66%2Favatar%2Favatar_default.jpeg?alt=media&token=8579e2f1-42b1-41ed-a641-833bbcc84194';

const StyledNavWrapper = styled(Box)(({ theme }) => ({
  minWidth: '16rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
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

const EVENT_NAV_ITEMS = [
  {
    id: 'information',
    title: 'Thông tin',
    icon: 'material-symbols:globe-asia-sharp',
    link: 'information',
  },
  {
    id: 'posts',
    title: 'Bài đăng',
    icon: 'material-symbols:globe-asia-sharp',
    link: 'posts',
  },
  {
    id: 'events',
    title: 'Sự kiện',
    icon: 'carbon:checkmark-filled',
    link: 'events',
  },
  {
    id: 'funds',
    title: 'Gây quỹ',
    icon: 'material-symbols:bookmark',
    link: 'funds',
  },
  {
    id: 'recruitment',
    title: 'Tuyển dụng',
    icon: 'material-symbols:person-pin',
    link: 'recruitment',
  },
];

const ProfileSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentProfileTab = searchParams.get('profile_tab');
  const { canEditProfile, userProfileId } = useCanEditProfile();

  const { data } = useGetUserInformationQuery(userProfileId);

  const handleDrop = async (acceptedFiles: any, type: string) => {
    const { uploadAvatar } = setStorage();
    const file = acceptedFiles[0];

    try {
      toast.loading('Uploading...', {
        toastId: type,
      });
      const url = await uploadAvatar(generateUniqSerial(), file);
      // userProfileId &&
      //   (await updateUserInformation({
      //     avatarUrl: url,
      //     userId: userProfileId,
      //   }));
      // update profile
      toast.dismiss(type);
      toast.success('Cập nhật thành công');
    } catch (error: any) {
      toast.dismiss(type);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <StyledNavWrapper>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <UploadAvatar
            disabled={!canEditProfile}
            file={data?.data?.avatarUrl || avatarUrlDefault}
            maxSize={3145728}
            onDrop={(e, _) => handleDrop(e, 'avatar')}
          />
          <Typography variant="h5" textAlign="center">
            {data?.data?.fullName}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: '100%', py: 2 }}>
        <StyledNav>
          {EVENT_NAV_ITEMS.map(item => {
            const isActive = item.link && currentProfileTab === item.link;
            return (
              <Link
                key={item.id}
                href={`${pathname}/?profile_tab=${item.link}`}
                style={{ color: 'inherit', width: '100%' }}
              >
                <StyledNavItem
                  sx={{
                    backgroundColor: isActive
                      ? theme.palette.primary.lighter
                      : undefined,
                    color: isActive ? theme.palette.primary.main : undefined,
                  }}
                >
                  <Icon height={24} icon={item.icon} />
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Box sx={{ flex: 1 }} />
                </StyledNavItem>
              </Link>
            );
          })}
        </StyledNav>
      </Card>
    </StyledNavWrapper>
  );
};

export default ProfileSidebar;
