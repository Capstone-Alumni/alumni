import { Information } from '@prisma/client';
import { Icon } from '@iconify/react';
// material
import { Box, Grid, styled, useTheme } from '@mui/material';
import { Card, Stack } from '@mui/material';
// @types
import ProfileInfoRow from './InfoRowCustom';
import { isAllowToViewValue } from 'src/utils/mappingPublicity';
import Linkify from 'react-linkify';
import ProfileCover from './ProfileCover';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
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
  userInformation: Information;
};

const ProfileAbout = ({ userInformation }: ProfileAboutProps) => {
  const theme = useTheme();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ p: 3, overflow: 'visible' }}>
          <ProfileCover userProfileId={userInformation?.userId} />
          <Stack sx={{ margin: '1.25rem 0 0rem 0' }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: theme.spacing(5),
              }}
            />
          </Stack>
          <div>
            <Box style={{ paddingLeft: theme.spacing(2) }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Box style={{ flex: 1 }}>
                  <ProfileInfoRow
                    title="Bio"
                    content={
                      userInformation?.bio
                        ? userInformation.bio
                        : 'Chưa cập nhật'
                    }
                  />
                  <ProfileInfoRow
                    title="Họ và tên"
                    content={
                      userInformation?.fullName
                        ? userInformation.fullName
                        : 'Chưa cập nhật'
                    }
                  />
                  <ProfileInfoRow
                    title="Email liên lạc"
                    content={
                      userInformation?.email
                        ? userInformation.email
                        : 'Chưa cập nhật'
                    }
                  />
                  {isAllowToViewValue(
                    currentUserInformation,
                    userInformation,
                    userInformation?.phonePublicity,
                  ) &&
                    Boolean(userInformation?.phone) && (
                      <ProfileInfoRow
                        title="Điện thoại"
                        content={userInformation.phone}
                        isPrivacy
                        userInformationData={userInformation}
                        name="phonePublicity"
                        isAllowToView={
                          userInformation?.userId ===
                          currentUserInformation.userId
                        }
                      />
                    )}
                  {isAllowToViewValue(
                    currentUserInformation,
                    userInformation,
                    userInformation?.facebookPublicity,
                  ) &&
                    Boolean(userInformation?.facebookUrl) && (
                      <ProfileInfoRow
                        title="Facebook"
                        content={
                          <Linkify
                            componentDecorator={(
                              decoratedHref,
                              decoratedText,
                              key,
                            ) => (
                              <a target="blank" href={decoratedHref} key={key}>
                                {decoratedText}
                              </a>
                            )}
                          >
                            {userInformation.facebookUrl}
                          </Linkify>
                        }
                        isPrivacy
                        name="facebookPublicity"
                        userInformationData={userInformation}
                        isAllowToView={
                          userInformation?.userId ===
                          currentUserInformation.userId
                        }
                      />
                    )}
                  {isAllowToViewValue(
                    currentUserInformation,
                    userInformation,
                    userInformation?.dateOfBirthPublicity,
                  ) &&
                    Boolean(userInformation?.dateOfBirth) && (
                      <ProfileInfoRow
                        title="Ngày sinh"
                        content={
                          userInformation?.dateOfBirth &&
                          new Date(
                            userInformation.dateOfBirth,
                          ).toLocaleDateString('en-GB')
                        }
                        isPrivacy
                        userInformationData={userInformation}
                        name="dateOfBirthPublicity"
                        isAllowToView={
                          userInformation?.userId ===
                          currentUserInformation.userId
                        }
                      />
                    )}
                  {/* <ProfileInfoRow
                    title="Khoá"
                    content={
                      userInformation?.gradeName
                        ? userInformation.gradeName
                        : 'Chưa cập nhật'
                    }
                  /> */}
                  {/* <ProfileInfoRow
                    title="Lớp"
                    content={
                      userInformation?.
                        ? userInformation.className
                        : 'Chưa cập nhật'
                    }
                  /> */}
                </Box>
              </Box>
            </Box>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileAbout;
