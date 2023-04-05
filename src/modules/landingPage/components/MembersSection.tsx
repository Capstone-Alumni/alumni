'use client';

import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useGetAdminProfileList from 'src/modules/search/hooks/useGetAdminProfileList';
import { getAdminProfileListDataAtom } from 'src/modules/search/states';
import { Carousel } from 'react-responsive-carousel';
import MyAvatar from '@share/components/MyAvatar';
import getRoleName from '@share/utils/getRoleName';

const MembersSection = () => {
  const theme = useTheme();

  const data = useRecoilValue(getAdminProfileListDataAtom);
  const { fetchApi } = useGetAdminProfileList();

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
        background: `linear-gradient(38deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.lighter} 35%, ${theme.palette.common.white} 100%);`,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(10),
        }}
      >
        <Typography variant="h2" color="primary" sx={{ mb: 2 }}>
          Ban thường trực
        </Typography>

        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          centerMode
          centerSlidePercentage={30}
          // infiniteLoop
          interval={2000}
          swipeable
          selectedItem={0}
        >
          {data?.items.map(item => (
            <Box key={item.id}>
              <Card sx={{ mx: 2, mb: 5 }}>
                <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
                  <Stack direction="column" alignItems="center">
                    <MyAvatar
                      displayName={item?.information?.fullName}
                      photoUrl={item?.information?.avatarUrl}
                      size={250}
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="h6">
                      {item?.information?.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {item?.information?.email}
                    </Typography>
                    <Typography>{getRoleName(item.accessLevel)}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default MembersSection;
