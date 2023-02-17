'use client';

import { Button, Grid, Tab, Tabs } from '@mui/material';
import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePublicGetEventById from '../hooks/usePublicGetEventById';

const EventDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const pathname = usePathname();

  const eventId = pathname?.split('/')[2] || '';

  const { data, fetchApi, isLoading } = usePublicGetEventById();

  useEffect(() => {
    fetchApi({ eventId: eventId });
  }, []);

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  const { data: eventData } = data;

  return (
    <Box>
      <Typography>{eventData.title}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box>
            <Typography>Hình thức</Typography>
            <Typography>Mở đơn đăng ký</Typography>
            <Typography>Bắt đâu diễn ra</Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box>
            <Button>Quan tâm</Button>
            <Button>Tham gia</Button>
          </Box>
        </Grid>
      </Grid>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
        <Tab value="participant" label="Người tham dự" />
        <Tab value="fund" label="Gây quỹ" />
      </Tabs>

      {tabKey === 'description' ? (
        <Box>
          <Typography>{eventData?.description}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default EventDetailPage;
