import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

// material
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
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
    .min(1)
    .max(100, 'Tối đa 100 kí tự'),
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(0),
    width: '700px',
    margin: '0 auto',
    maxWidth: '100vw',
  },
}));

const StyledDivider = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const StyledWrapperImageCover = styled('div')(({ theme }) => ({
  width: '45%',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const StyledWrapperContent = styled('div')(({ theme }) => ({
  width: '55%',
}));

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
        <StyledDialog open={open} onClose={handleClose}>
          <StyledDivider>
            <StyledWrapperImageCover>
              <img src="https://www.kindpng.com/picc/m/243-2436343_boy-best-friends-cartoon-friends-png-transparent-png.png" />
            </StyledWrapperImageCover>
            <StyledWrapperContent>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <DialogContent sx={{ paddingBottom: '0' }}>
                    <Typography variant="h3">Người bạn biết?</Typography>
                    <Stack sx={{ margin: '0.5rem 0' }}>
                      <Typography variant="body2" color={'red'}>
                        Lưu ý*: Bằng cách gửi tin nhắn thông qua SMS (tối đa 100
                        kí tự) tới người này và bạn được gửi tối đa 1 lần.
                      </Typography>
                    </Stack>
                    <Box>
                      <Stack sx={{ py: '0.5rem' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <TextField
                            label="Tin nhắn"
                            rows={3}
                            multiline
                            fullWidth
                            {...getFieldProps('message')}
                            error={Boolean(touched.message && errors.message)}
                            helperText={touched.message && errors.message}
                          />
                          <div>
                            <Typography variant="body2">
                              Kí tự còn lại:{' '}
                              {100 - getFieldProps('message').value.length < 0
                                ? 0
                                : 100 - getFieldProps('message').value.length}
                            </Typography>
                          </div>
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
            </StyledWrapperContent>
          </StyledDivider>
        </StyledDialog>
      </div>
    </>
  );
}
