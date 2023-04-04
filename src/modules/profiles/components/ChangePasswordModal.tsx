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

// ----------------------------------------------------------------------
interface ChangePasswordModalProps {
  children?: React.ReactNode;
  userProfileId: string;
}

const messageSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Mật khẩu không được để trống'),
  newPassword: Yup.string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải lớn hơn 6 kí tự')
    .max(20, 'Mật khẩu phải ít hơn 30 kí tự'),
  newPasswordConfirmation: Yup.string()
    .required('Mật khẩu lặp lại không được để trống')
    .test('passwords-match', 'Mật khẩu không giống nhau', function (value) {
      return this.parent.newPassword === value;
    }),
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(0),
    width: '50vw',
    margin: '0 auto',
    maxWidth: '100vw',
  },
}));

const StyledDivider = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const StyledWrapperContent = styled('div')(({ theme }) => ({
  width: '100%',
}));

export default function ChangePasswordModal({
  children,
  userProfileId,
}: ChangePasswordModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
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
      <div style={{ width: '100%' }} onClick={handleClickOpen}>
        {children}
      </div>
      <div>
        <StyledDialog open={open} onClose={handleClose}>
          <StyledDivider>
            <StyledWrapperContent>
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <DialogContent sx={{ paddingBottom: '0' }}>
                    <Typography variant="h4">Đổi mật khẩu</Typography>
                    <Box sx={{ marginTop: '0.5rem' }}>
                      <Stack sx={{ py: '0.5rem' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <TextField
                            label="Mật khẩu hiện tại"
                            type="password"
                            fullWidth
                            {...getFieldProps('currentPassword')}
                            error={Boolean(
                              touched.currentPassword && errors.currentPassword,
                            )}
                            helperText={
                              touched.currentPassword && errors.currentPassword
                            }
                          />
                          <TextField
                            label="Mật khẩu mới"
                            type="password"
                            fullWidth
                            {...getFieldProps('newPassword')}
                            error={Boolean(
                              touched.newPassword && errors.newPassword,
                            )}
                            helperText={
                              touched.newPassword && errors.newPassword
                            }
                          />
                          <TextField
                            label="Nhập lại mật khẩu mới"
                            type="password"
                            fullWidth
                            {...getFieldProps('newPasswordConfirmation')}
                            error={Boolean(
                              touched.newPasswordConfirmation &&
                                errors.newPasswordConfirmation,
                            )}
                            helperText={
                              touched.newPasswordConfirmation &&
                              errors.newPasswordConfirmation
                            }
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
                      Đổi mật khẩu
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
