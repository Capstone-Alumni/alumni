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
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72),
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
  const { position, cover } = myProfile;
  const [avatar, setAvatar] = useState<string>("");
  const handleDrop = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const { uploadAvatar } = setStorage();
    const url = await uploadAvatar(generateUniqSerial(), file);
    setAvatar(url);
  }

  return (
    <RootStyle>
      <InfoStyle>
        <UploadAvatar
          file={avatar}
          maxSize={3145728}
          onDrop={handleDrop}
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
      <CoverImgStyle alt="profile cover" src={cover} />
    </RootStyle>
  );
}
