import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// material
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Information, ScopePublicity } from '@prisma/client';
import { useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';
// ----------------------------------------------------------------------
interface EditProfileFormProps {
  onClose: () => void;
  userInformation: Information
}

export default function EditVisibilityForm({
  onClose,
  userInformation
}: EditProfileFormProps) {
  const [updateUserInformation, { isLoading: isUpdating }] = useUpdateUserInformationMutation();

  const [visibility, setVisibility] = useState({
    emailPublicity: "PRIVATE" as ScopePublicity,
    phonePublicity: "PRIVATE" as ScopePublicity,
    facebookPublicity: "PRIVATE" as ScopePublicity,
    dateOfBirthPublicity: "PRIVATE" as ScopePublicity,
    careerPublicity: "PRIVATE" as ScopePublicity,
    educationPublicity: "PRIVATE" as ScopePublicity,
  });

  useEffect(() => {
    if (userInformation) {
      setVisibility({
        emailPublicity: userInformation.emailPublicity as ScopePublicity,
        phonePublicity: userInformation.phonePublicity as ScopePublicity,
        facebookPublicity: userInformation.facebookPublicity as ScopePublicity,
        dateOfBirthPublicity: userInformation.dateOfBirthPublicity as ScopePublicity,
        careerPublicity: userInformation.careerPublicity as ScopePublicity,
        educationPublicity: userInformation.educationPublicity as ScopePublicity,
      })
    }
  }, [userInformation])

  const handleMappingVisibility = (visibility: ScopePublicity) => {
    if (visibility === ScopePublicity.PRIVATE) return { label: 'Chỉ mình tôi', publicity: ScopePublicity.PRIVATE };
    if (visibility === ScopePublicity.CLASS) return { label: 'Lớp', publicity: ScopePublicity.CLASS };
    if (visibility === ScopePublicity.GRADE) return { label: 'Khối', publicity: ScopePublicity.GRADE };
    if (visibility === ScopePublicity.SCHOOL) return { label: 'Trường', publicity: ScopePublicity.SCHOOL };
  }

  const handleOnChange = (value: any, field: string) => {
    setVisibility({
      ...visibility,
      [field]: value?.publicity || ScopePublicity.PRIVATE
    })
  }

  const onSubmitForm = async () => {
    try {
      await updateUserInformation({ userId: userInformation.userId, ...visibility });
      onClose();
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <>
      <DialogTitle>Chỉnh sửa quyền riêng tư</DialogTitle>
      <DialogContent>
        <Stack sx={{ py: 1 }}>
          <DialogContentText>
            Bằng cách chọn vào từng lựa chọn phía dưới giúp thông tin của bạn được ẩn/hiện phù hợp với mong muốn của bạn.
          </DialogContentText>
        </Stack>
        <Box>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Your email</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.emailPublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'emailPublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Số điện thoại</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.phonePublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'phonePublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Facebook</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.facebookPublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'facebookPublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Ngày sinh</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.dateOfBirthPublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'dateOfBirthPublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Công việc</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.careerPublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'careerPublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
          <Stack sx={{ py: '0.25rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: "1rem" }}>
              <Typography variant='subtitle1' sx={{ minWidth: "120px" }}>Học vấn</Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(visibility.educationPublicity as ScopePublicity)}
                onChange={(_, value) => {
                  handleOnChange(value, 'educationPublicity');
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Ai có thể xem" size='small' />}
              />
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <LoadingButton onClick={onSubmitForm} variant="contained" loading={isUpdating}>
          Lưu
        </LoadingButton>
      </DialogActions>
    </>
  );
}

const visibilityPublicity = [
  { label: 'Chỉ mình tôi', publicity: ScopePublicity.PRIVATE },
  { label: 'Lớp', publicity: ScopePublicity.CLASS },
  { label: 'Khối', publicity: ScopePublicity.GRADE },
  { label: 'Trường', publicity: ScopePublicity.SCHOOL },
];