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
import { ScopePublicity } from '@prisma/client';
import { useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';
import { mappingScopPublicityToFieldName } from 'src/utils/mappingPublicity';
// ----------------------------------------------------------------------
interface EditProfileFormProps {
  onClose: () => void;
  userInformation: any;
  name: string;
}

export default function EditVisibilityForm({
  onClose,
  userInformation,
  name,
}: EditProfileFormProps) {
  const [updateUserInformation, { isLoading: isUpdating }] =
    useUpdateUserInformationMutation();

  const [visibility, setVisibility] = useState({
    [name]: 'PRIVATE' as ScopePublicity,
  });

  useEffect(() => {
    if (userInformation) {
      setVisibility({
        [name]: userInformation[name] as ScopePublicity,
      });
    }
  }, [userInformation]);

  const handleMappingVisibility = (visibility: ScopePublicity) => {
    if (visibility === ScopePublicity.PRIVATE) {
      return { label: 'Chỉ mình tôi', publicity: ScopePublicity.PRIVATE };
    }
    if (visibility === ScopePublicity.CLASS) {
      return { label: 'Lớp', publicity: ScopePublicity.CLASS };
    }
    if (visibility === ScopePublicity.GRADE) {
      return { label: 'Khoá', publicity: ScopePublicity.GRADE };
    }
    if (visibility === ScopePublicity.SCHOOL) {
      return { label: 'Trường', publicity: ScopePublicity.SCHOOL };
    }
  };

  const handleOnChange = (value: any, field: string) => {
    setVisibility({
      ...visibility,
      [field]: value?.publicity || ScopePublicity.PRIVATE,
    });
  };

  const onSubmitForm = async () => {
    try {
      await updateUserInformation({
        userId: userInformation.alumniId,
        ...visibility,
      });
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
            Bằng cách chọn vào từng lựa chọn phía dưới giúp thông tin của bạn
            được ẩn/hiện phù hợp với mong muốn của bạn.
          </DialogContentText>
        </Stack>
        <Box sx={{ minHeight: '6.5rem' }}>
          <Stack sx={{ py: '0.25rem' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '1rem',
              }}
            >
              <Typography variant="subtitle1" sx={{ minWidth: '120px' }}>
                {mappingScopPublicityToFieldName[name]}
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-publicity"
                options={visibilityPublicity}
                value={handleMappingVisibility(
                  visibility[name] as ScopePublicity,
                )}
                onChange={(_, value) => {
                  handleOnChange(value, name);
                }}
                sx={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Ai có thể xem" size="small" />
                )}
              />
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <LoadingButton
          onClick={onSubmitForm}
          variant="contained"
          loading={isUpdating}
        >
          Lưu
        </LoadingButton>
      </DialogActions>
    </>
  );
}

const visibilityPublicity = [
  { label: 'Chỉ mình tôi', publicity: ScopePublicity.PRIVATE },
  { label: 'Lớp', publicity: ScopePublicity.CLASS },
  { label: 'Khoá', publicity: ScopePublicity.GRADE },
  { label: 'Trường', publicity: ScopePublicity.SCHOOL },
];
