import { Information } from "@prisma/client"
import { Icon } from '@iconify/react';
// material
import { Box, styled, Grid, useTheme } from '@mui/material';
import {
  Card,
  Stack,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// @types
import { orange } from "@mui/material/colors";
import ProfileInfoRow from "./InfoRow";
import { isAllowToViewValue } from "src/utils/mappingPublicity";
import { useAppSelector } from "src/redux/hooks";
import { RootState } from "src/redux/store";

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------
type ProfileAboutProps = {
  userInformation: Information
}

const ProfileAbout = ({ userInformation }: ProfileAboutProps) => {
  const theme = useTheme();
  const currentUser = useAppSelector((state: RootState) => state.currentUser);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3 }}>
          <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
              <Typography variant="h5" style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
                <PersonIcon fontSize="large" style={{ color: orange[900], marginRight: theme.spacing(1) }} />
                Thông tin liên hệ
              </Typography>
            </Box>
          </Stack>
          <div>
            {currentUser?.data?.information && <Box style={{ paddingLeft: theme.spacing(2) }}>
              <Box style={{ display: 'flex' }}>
                <Box style={{ flex: 1 }}>
                  {Boolean(userInformation?.bio) && <ProfileInfoRow title="Bio" content={userInformation.bio} />}
                  {Boolean(userInformation?.fullName) && <ProfileInfoRow title="Họ và tên" content={userInformation.fullName} />}
                  {isAllowToViewValue(currentUser.data.information, userInformation, userInformation?.emailPublicity) && Boolean(userInformation?.userEmail) && <ProfileInfoRow title="Email liên lạc" content={userInformation.userEmail} />}
                  {isAllowToViewValue(currentUser.data.information, userInformation, userInformation?.phonePublicity) && Boolean(userInformation?.phone) && <ProfileInfoRow title="Điện thoại" content={userInformation.phone} />}
                  {isAllowToViewValue(currentUser.data.information, userInformation, userInformation?.facebookPublicity) && Boolean(userInformation?.facebookUrl) && <ProfileInfoRow title="Facebook" content={userInformation.facebookUrl} />}
                  {isAllowToViewValue(currentUser.data.information, userInformation, userInformation?.dateOfBirthPublicity) && Boolean(userInformation?.dateOfBirth) && <ProfileInfoRow title="Ngày sinh" content={userInformation?.dateOfBirth && new Date(userInformation.dateOfBirth).toLocaleDateString('en-GB')} />}
                  {Boolean(userInformation?.gradeName) && <ProfileInfoRow title="Khối" content={userInformation.gradeName} />}
                  {Boolean(userInformation?.className) && <ProfileInfoRow title="Lớp" content={userInformation.className} />}
                </Box>
              </Box>
            </Box>}
          </div>
        </Card>
      </Grid>
    </Grid >
  );
}

export default ProfileAbout;