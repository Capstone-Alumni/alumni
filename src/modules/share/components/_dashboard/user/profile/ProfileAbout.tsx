import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import infoFill from '@iconify/icons-eva/info-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import roundBusinessCenter from '@iconify/icons-ic/round-business-center';

// material
import { Box, styled } from '@mui/material';
import { Link, Card, Typography, CardHeader, Stack, Button } from '@mui/material';
// @types

import { Profile } from '../../../../type';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function ProfileAbout({ profile }: { profile: Profile }) {
  const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <CardHeader title="About" />
        <Box sx={{ paddingRight: 3, marginTop: "1rem" }}>
          <a href='/profile/edit'>
          <Button variant="contained">Edit</Button>
          </a>
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={infoFill} />
          <Typography variant="body2">
            Class &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              12A4
            </Link>
          </Typography>
          &nbsp;-&nbsp;
          <Typography variant="body2">
            Grade &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              K15
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={phoneFill} />
          <Typography variant="body2">
            Phone &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              0912344834
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={calendarFill} />
          <Typography variant="body2">
            Birth &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              23-13-2099
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
