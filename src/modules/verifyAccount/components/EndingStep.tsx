import { Button } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';

const EndingStep = () => {
  return (
    <>
      <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
        <Typography sx={{ my: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button>Reset</Button>
      </Box>
    </>
  );
};

export default EndingStep;
