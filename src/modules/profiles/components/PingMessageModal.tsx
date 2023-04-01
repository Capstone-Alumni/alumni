import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

// material
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useSendMessage from '../hooks/useSendMessage';

// ----------------------------------------------------------------------
interface PingMessageModalProps {
  children?: React.ReactNode;
  userProfileId: string;
  onSendMessageSuccess: () => void;
}

const messageSchema = Yup.object().shape({
  message: Yup.string()
    .required('Tin nhắn không được để trống')
    .min(1, 'Must be exactly 5 digits')
    .max(100, 'Must be exactly 5 digits'),
});

export default function PingMessageModal({
  children,
  userProfileId,
  onSendMessageSuccess,
}: PingMessageModalProps) {
  const [open, setOpen] = useState(false);
  const { fetchApi: sendMessage } = useSendMessage();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      message: '',
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await sendMessage({
          message: values.message,
          userReceiveMessageId: userProfileId,
        });
        resetForm();
        handleClose();
        onSendMessageSuccess();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <div style={{ width: '100%' }} onClick={handleClickOpen}>
        {children}
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ width: '700px', margin: '0 auto' }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <DialogTitle>Người bạn quen?</DialogTitle>
              <DialogContent>
                <Stack sx={{ py: 1 }}>
                  <DialogContentText>
                    Bằng cách gửi tin nhắn thông qua SMS (tối đa 100 kí tự) tới
                    người này và bạn được gửi tối đa 1 lần
                  </DialogContentText>
                </Stack>
                <Box>
                  <Stack sx={{ py: '0.25rem' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '1rem',
                      }}
                    >
                      <TextField
                        label="Tin nhắn"
                        multiline
                        fullWidth
                        {...getFieldProps('message')}
                        error={Boolean(touched.message && errors.message)}
                        helperText={touched.message && errors.message}
                      />
                    </Box>
                  </Stack>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="inherit">
                  Huỷ
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Gửi
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>
      </div>
    </>
  );
}
