// material
import { Paper, Stack } from '@mui/material';

import VerticalLinearStepper from './VerticalLinearStepper';

// ----------------------------------------------------------------------

export default function StepperComponent() {
  return (
    <Stack spacing={1}>
      <Paper
        sx={{
          width: '100%',
          boxShadow: (theme) => theme.customShadows.z8
        }}
      >
        <VerticalLinearStepper />
      </Paper>
    </Stack>
  );
}
