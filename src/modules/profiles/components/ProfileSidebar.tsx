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
import Link from '@share/components/NextLinkV2';
import { useCanEditProfile } from '../helpers/canEditProfile';
import { useCanSendMessage } from '../helpers/canSendMessage';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  useGetUserInformationQuery,
  useUpdateUserInformationMutation,
} from '@redux/slices/userProfileSlice';
import UploadAvatarInput from '@share/components/form/UploadAvatarInput';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SmsIcon from '@mui/icons-material/Sms';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import PingMessageModal from './PingMessageModal';
import ChangePasswordModal from './ChangePasswordModal';

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

const NAV_ITEMS = [
  {
    id: 'information',
    title: 'Thông tin',
    icon: 'mingcute:profile-fill',
    link: 'information',
  },
];

const ProfileSidebar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentProfileTab = searchParams.get('profile_tab');
  const [alreadySendMessage, setAlreadySendMessage] = useState<number>(0);
  const { canEditProfile, userProfileId } = useCanEditProfile();

  const { data } = useGetUserInformationQuery(userProfileId);

  const { canSendMessage } = useCanSendMessage();

  const [updateUserInformation] = useUpdateUserInformationMutation();

  const { control, setValue } = useForm({
    defaultValues: {
      avatar: data?.data?.information.avatarUrl,
    },
  });

  const handleChangeAvatar = async (url: string) => {
    if (!userProfileId) {
      return;
    }
    await updateUserInformation({
      avatarUrl: url,
      userId: userProfileId,
    });
  };

  const handleSendMessageSuccess = () => {
    setAlreadySendMessage(-1);
  };

  useEffect(() => {
    setValue('avatar', data?.data?.information.avatarUrl);
  }, [data?.data?.information.avatarUrl]);

  return (
    <StyledNavWrapper>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <UploadAvatarInput
            control={control}
            name="avatar"
            inputProps={{
              disabled: !canEditProfile,
              maxSize: 3145728,
              onChange: handleChangeAvatar,
              hideShowGuideText: !canEditProfile,
            }}
          />
          <Typography sx={{ mt: 1 }} variant="h5" textAlign="center">
            {data?.data?.fullName}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: '100%', py: 2 }}>
        <StyledNav>
          {NAV_ITEMS.map((item) => {
            const isActive = item.link && currentProfileTab === item.link;
            return (
              <Link
                key={item.id}
                href={pathname || ''}
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
          {alreadySendMessage === -1 ||
            (canSendMessage &&
            data?.data?.information?.havePhone &&
            userProfileId ? (
              <PingMessageModal
                userProfileId={userProfileId}
                onSendMessageSuccess={handleSendMessageSuccess}
              >
                <Button
                  sx={{ width: '100%', justifyContent: 'left' }}
                  startIcon={<SmsIcon />}
                  variant="contained"
                  color="warning"
                >
                  Gửi tin nhắn
                </Button>
              </PingMessageModal>
            ) : (
              alreadySendMessage === -1 ||
              (!canSendMessage &&
              data?.data?.information?.havePhone &&
              userProfileId ? (
                <PingMessageModal
                  userProfileId={userProfileId}
                  onSendMessageSuccess={handleSendMessageSuccess}
                >
                  <Button
                    sx={{ width: '100%', justifyContent: 'left' }}
                    startIcon={<SmsIcon />}
                    variant="contained"
                    color="warning"
                    disabled={true}
                  >
                    Gửi tin nhắn
                  </Button>
                </PingMessageModal>
              ) : null)
            ))}
          {canEditProfile && userProfileId && (
            <ChangePasswordModal userProfileId={userProfileId}>
              <Button
                sx={{ width: '100%', justifyContent: 'left' }}
                startIcon={<PasswordIcon />}
                variant="contained"
                color="error"
              >
                Đổi mật khẩu
              </Button>
            </ChangePasswordModal>
          )}
        </StyledNav>
      </Card>
    </StyledNavWrapper>
  );
};

export default ProfileSidebar;
