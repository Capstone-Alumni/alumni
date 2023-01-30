// material
import { alpha, styled } from '@mui/material';
import { Box, Typography } from '@mui/material';
// material
import MyAvatar from '../../../MyAvatar';
// @types
import { Profile } from '../../../../type';
import { UploadAvatar } from '@share/components/upload';
import { setStorage } from 'src/firebase/methods/setStorage';
import { generateUniqSerial } from 'src/utils';
import { useState } from 'react';
import { useGetUserInformationQuery, useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';
import { usePathname } from 'next/navigation';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.01),
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type ProfileCoverProps = {
  myProfile: Profile;
};

export default function ProfileCover({ myProfile }: ProfileCoverProps) {
  const pathname = usePathname();
  const userProfileId = pathname?.slice(pathname?.lastIndexOf("/") + 1);

  const { data } = useGetUserInformationQuery(userProfileId);

  const [updateUserInformation] = useUpdateUserInformationMutation();

  const { position, cover } = myProfile;

  const handleDrop = async (acceptedFiles: any, type: string) => {
    const { uploadAvatar } = setStorage();

    if (type === 'avatar') {
      const file = acceptedFiles[0];
      try {
        const url = await uploadAvatar(generateUniqSerial(), file);
        userProfileId && await updateUserInformation({ avatarUrl: url, userId: userProfileId })
      } catch (error: any) {
        console.error(error);
      }
    } else {
      const file = acceptedFiles.target.files[0];
      if (file) {
      const url = await uploadAvatar(generateUniqSerial(), file);
      userProfileId && await updateUserInformation({ coverImageUrl: url, userId: userProfileId })
      }
    }
  }

  return (
    <>
      {data && <>
        <InfoStyle>
          <UploadAvatar
            file={data?.data.information.avatarUrl}
            maxSize={3145728}
            onDrop={(e) => handleDrop(e, 'avatar')}
          />
          <Box
            sx={{
              ml: { md: 3 },
              mt: { xs: 1, md: 0 },
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4">Gia An</Typography>
            <Typography sx={{ opacity: 0.72 }}>{position}</Typography>
          </Box>
        </InfoStyle>
      </>
      }
      <label htmlFor="uploadWallpaper">
        <div>
          <CoverImgStyle alt="profile cover" src={data?.data.information.coverImageUrl} />
        </div>
        <RootStyle>
          <input
            type="file"
            id="uploadWallpaper"
            style={{ display: 'none' }}
            accept="image/png, image/jpeg"
            onChange={(e) => handleDrop(e, 'wallpaper')}
          />
        </RootStyle>
      </label>
    </>
  );
}
