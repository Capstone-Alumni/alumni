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
import useResponseReport from '../hooks/useResponseReport';
import { Report } from '../types';

// ----------------------------------------------------------------------
interface ResponseReportModalProps {
  children: React.ReactNode;
  data: Report;
  onResponse: () => void;
}

const messageSchema = Yup.object().shape({
  response: Yup.string()
    .required('Tin nhắn không được để trống')
    .min(1, 'Tối thiểu 20 kí tự'),
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

export default function ResponseReportModal({
  children,
  data,
  onResponse,
}: ResponseReportModalProps) {
  const [open, setOpen] = useState(false);
  const { fetchApi: sendResponseReport } = useResponseReport();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      response: data.response || '',
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await sendResponseReport({
          response: values.response,
          id: data.id,
        });
        resetForm();
        handleClose();
        onResponse();
        setSubmitting(false);
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
      <div style={{ height: '20px' }} onClick={handleClickOpen}>
        {children}
      </div>
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
                    <Typography variant="h3">Hỗ trợ lỗi</Typography>
                    <Box>
                      <Stack sx={{ py: '0.5rem' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            fontSize: '14px',
                          }}
                        >
                          <Typography fontSize="inherit" fontWeight="bold">
                            Người gửi:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                              {data.fullName}
                            </span>
                          </Typography>
                          <Typography fontSize="inherit" fontWeight="bold">
                            Nội dung:{' '}
                            <span style={{ fontWeight: 'normal' }}>
                              {data.message}
                            </span>
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack sx={{ py: '0.5rem' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <TextField
                            label="Tin nhắn hỗ trợ"
                            rows={3}
                            multiline
                            fullWidth
                            {...getFieldProps('response')}
                            error={Boolean(touched.response && errors.response)}
                            helperText={touched.response && errors.response}
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
            </StyledWrapperContent>
          </StyledDivider>
        </StyledDialog>
      </div>
    </>
  );
}
