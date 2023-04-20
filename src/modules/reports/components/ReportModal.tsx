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
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useSendReport from '../hooks/useSendReport';

// ----------------------------------------------------------------------
interface ReportModalProps {
  children: React.ReactNode;
}

const messageSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ và tên không được để trống'),
  email: Yup.string().required('Địa chỉ không được để trống'),
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
    // objectFit: 'cover',
  },
}));

const StyledWrapperContent = styled('div')(({ theme }) => ({
  width: '55%',
}));

export default function ReportModal({ children }: ReportModalProps) {
  const [open, setOpen] = useState(false);
  const { fetchApi: sendReport } = useSendReport();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: '',
      email: '',
      message: '',
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await sendReport({
          fullName: values.fullName,
          email: values.email,
          message: values.message,
        });
        resetForm();
        handleClose();
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
      <div onClick={handleClickOpen}>{children}</div>
      <div>
        <StyledDialog open={open} onClose={handleClose}>
          <StyledDivider>
            <StyledWrapperImageCover>
              <img src="https://www.kindpng.com/picc/m/722-7229719_report-problem-cartoon-hd-png-download.png" />
            </StyledWrapperImageCover>
            <StyledWrapperContent>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <DialogContent sx={{ paddingBottom: '0' }}>
                    <Typography variant="h3">Báo cáo lỗi</Typography>
                    <Stack sx={{ margin: '0.5rem 0' }}>
                      <Typography variant="body2" color={'red'}>
                        Lưu ý*: Bằng cách gửi qua đơn này, lời nhắn của bạn sẽ
                        được gửi trực tiếp đến ban quản lí của trường và sẽ phản
                        hồi trong 2 ngày làm việc thông qua email bạn cung cấp.
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
                            label="Họ và tên"
                            fullWidth
                            {...getFieldProps('fullName')}
                            error={Boolean(touched.fullName && errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                          />
                          <TextField
                            label="Địa chỉ email"
                            fullWidth
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                          />
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
