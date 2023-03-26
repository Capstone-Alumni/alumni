import { Button, useTheme } from '@mui/material';
import { Box, Paper, Typography } from '@mui/material';

import DoneSVG from 'public/done.svg';

const EndingStep = ({ reset }: { reset?: () => void }) => {
  const theme = useTheme();

  return (
    <>
      <Paper sx={{ p: 3, mb: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
        <Typography textAlign="center" sx={{ my: 1 }}>
          <DoneSVG style={{ fill: theme.palette.success.main }} />
          Nhấn nút nộp để hoàn thành.
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
