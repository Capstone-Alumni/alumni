// material
import { styled } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
// @types
import { UploadAvatar } from '@share/components/upload';
import { setStorage } from 'src/firebase/methods/setStorage';
import { generateUniqSerial } from 'src/utils';
import {
  useGetUserInformationQuery,
  useUpdateUserInformationMutation,
} from 'src/redux/slices/userProfileSlice';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

const InfoStyle = styled('div')(({ theme }) => ({
  left: '1rem',
  top: '-5rem',
  zIndex: 99999,
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

const avatarUrlDefault =
  'https://firebasestorage.googleapis.com/v0/b/alumni-pf.appspot.com/o/users%2F6a5e-9e80-43e-cf66%2Favatar%2Favatar_default.jpeg?alt=media&token=8579e2f1-42b1-41ed-a641-833bbcc84194';
const wallpaperUrlDefault =
  'https://firebasestorage.googleapis.com/v0/b/alumni-pf.appspot.com/o/users%2F5cce-2d10-583-0cd9%2Favatar%2Fwallpaper_default.jpg?alt=media&token=8d1b5842-d9ce-4c9f-b577-0b1e36a5100a';
type ProfileCoverProps = {
  userProfileId: string;
};

export default function ProfileCover({ userProfileId }: ProfileCoverProps) {
  const { data } = useGetUserInformationQuery(userProfileId);

  const currentUser = useAppSelector((state: RootState) => state.currentUser);
  const [updateUserInformation] = useUpdateUserInformationMutation();

  const handleDrop = async (acceptedFiles: any, type: string) => {
    const { uploadAvatar } = setStorage();

    if (type === 'avatar') {
      const file = acceptedFiles[0];

      try {
        toast.loading('Uploading...', {
          toastId: type,
        });
        const url = await uploadAvatar(generateUniqSerial(), file);
        userProfileId &&
          (await updateUserInformation({
            avatarUrl: url,
            userId: userProfileId,
          }));
        toast.dismiss(type);
        toast.success('Cập nhật thành công');
      } catch (error: any) {
        toast.dismiss(type);
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    } else {
      const file = acceptedFiles.target.files[0];
      if (file) {
        try {
          toast.loading('Uploading...', {
            toastId: type,
          });
          const url = await uploadAvatar(generateUniqSerial(), file);
          userProfileId &&
            (await updateUserInformation({
              coverImageUrl: url,
              userId: userProfileId,
            }));
          toast.dismiss(type);
          toast.success('Cập nhật thành công');
        } catch (error: any) {
          toast.dismiss(type);
          toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
      }
    }
  };

  return (
    <>
      {data && (
        <>
          <InfoStyle>
            <UploadAvatar
              disabled={currentUser?.data?.userId !== userProfileId}
              file={data?.data?.avatarUrl || avatarUrlDefault}
              maxSize={3145728}
              onDrop={(e, _) => handleDrop(e, 'avatar')}
            />
            <Box
              sx={{
                ml: { md: 2 },
                mt: { xs: 1, md: 0 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h5">{data?.data?.fullName}</Typography>
            </Box>
          </InfoStyle>
        </>
      )}
      {/* <label htmlFor="uploadWallpaper">
        <div>
          <CoverImgStyle
            alt="profile cover"
            src={data?.data?.coverImageUrl || wallpaperUrlDefault}
          />
        </div>
        <RootStyle
          style={{
            cursor: `${
              currentUser?.data?.userId === userProfileId ? 'pointer' : 'auto'
            }`,
          }}
        >
          {currentUser?.data?.userId === userProfileId && (
            <input
              type="file"
              id="uploadWallpaper"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              onChange={(e: any) => handleDrop(e, 'wallpaper')}
            />
          )}
        </RootStyle>
      </label> */}
    </>
  );
}
