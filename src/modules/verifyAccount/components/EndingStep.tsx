import { Button } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';

const EndingStep = ({ reset }: { reset?: () => void }) => {
  return (
    <>
      <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
        <Typography sx={{ my: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" onClick={reset}>
          Điền lại
        </Button>
        <Button type="submit" variant="contained">
          Nộp
        </Button>
      </Box>
    </>
  );
};

export default EndingStep;
