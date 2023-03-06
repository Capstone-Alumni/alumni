import { Box, Button, Modal, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const ConfirmUpdateModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const theme = useTheme();
  const [confirming, setConfirming] = useState(false);

  const onConfirmHandler = async () => {
    setConfirming(true);
    await onConfirm();
    setConfirming(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: theme.spacing(2),
          padding: theme.spacing(2),
          borderRadius: `${theme.shape.borderRadius}px`,
          backgroundColor: theme.palette.background.neutral,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6">Xác nhận thao tác</Typography>

          <Typography>
            Sau khi thực hiện thao tác này, chúng tôi sẽ dẫn bạn tới trang web
            mới của mình, bạn có thể phải đăng nhập lại. Bạn có chắc chắn muốn
            thực hiện thao tác?
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(2),
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            disabled={confirming}
            onClick={() => onConfirmHandler()}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmUpdateModal;
