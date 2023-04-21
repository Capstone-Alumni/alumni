import Linkify from 'react-linkify';
import { Icon } from '@iconify/react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { indigo } from '@mui/material/colors';
import ProfileInfoRow from '../InfoRowCustom';

const ProfileInformationSection = ({
  userInformation: userInformationResponse,
  openEdit,
}: {
  userInformation: any;
  openEdit: null | (() => void);
}) => {
  const userInformation = userInformationResponse?.data?.data?.information;

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <AccountCircleIcon fontSize="large" style={{ color: indigo[500] }} />

          <Typography variant="h5" sx={{ flex: 1 }}>
            Thông tin cơ bản
          </Typography>

          {openEdit ? (
            <IconButton onClick={openEdit}>
              <Icon height={24} icon="uil:pen" />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ ml: 5 }}>
          <ProfileInfoRow
            title="Bio"
            content={
              userInformation?.bio ? userInformation.bio : 'Chưa cập nhật'
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
              userInformation?.email ? userInformation.email : 'Chưa cập nhật'
            }
          />
          {Boolean(userInformation?.alumClass) && (
            <ProfileInfoRow
              title="Niên khóa"
              content={
                userInformation?.alumClass.grade.code
                  ? userInformation.alumClass.grade.code
                  : 'Chưa cập nhật'
              }
            />
          )}
          {Boolean(userInformation?.alumClass) && (
            <ProfileInfoRow
              title="Lớp"
              content={
                userInformation?.alumClass.name
                  ? userInformation.alumClass.name
                  : 'Chưa cập nhật'
              }
            />
          )}
          {Boolean(userInformation?.phone) && (
            <ProfileInfoRow
              title="Điện thoại"
              content={userInformation.phone}
              isPrivacy
              userInformationData={userInformation}
              name="phonePublicity"
              isAllowToView={openEdit}
            />
          )}
          {Boolean(userInformation?.facebookUrl) && (
            <ProfileInfoRow
              title="Facebook"
              content={
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
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
              isAllowToView={openEdit}
            />
          )}
          {Boolean(userInformation?.dateOfBirth) && (
            <ProfileInfoRow
              title="Ngày sinh"
              content={
                userInformation?.dateOfBirth &&
                new Date(userInformation.dateOfBirth).toLocaleDateString(
                  'en-GB',
                )
              }
              isPrivacy
              userInformationData={userInformation}
              name="dateOfBirthPublicity"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileInformationSection;
