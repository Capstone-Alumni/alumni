import { Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { RootState } from '@redux/store';
import SelectInput from '@share/components/form/SelectInput';
import MyAvatar from '@share/components/MyAvatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import TextInput from '@share/components/form/TextInput';
import { Button } from '@mui/material';
import { useState } from 'react';

export type PostFormValues = {
  content: string;
  publicity: string;
};

const validationSchema = yup.object({
  content: yup.string().required(),
  publicity: yup.string().required(),
});

const PostForm = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (values: PostFormValues) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();
  const currentUserInformation = useAppSelector(
    (state: RootState) => state.currentUser,
  );

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      content: '',
      publicity: 'ALUMNI',
    },
    resolver,
  });

  const onSaveWithLoading = async (values: PostFormValues) => {
    setIsSaving(true);
    await onSave(values);
    setIsSaving(false);
    onClose?.();
  };

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{
        width: '100%',
        padding: theme.spacing(2),
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <MyAvatar />

        <Typography fontWeight={600}>
          {currentUserInformation?.data.fullName}
        </Typography>
      </Stack>

      <SelectInput
        control={control}
        name="publicity"
        inputProps={{
          fullWidth: true,
          label: 'Ai có thể nhìn thấy bài đăng này',
        }}
        options={[
          {
            value: 'ALUMNI',
            name: 'Chỉ bạn nhìn thấy',
          },
          {
            value: 'CLASS_MOD',
            name: 'Chỉ người cùng lớp',
          },
          {
            value: 'GRADE_MOD',
            name: 'Chỉ người cùng niên khoá',
          },
          {
            value: 'SCHOOL_ADMIN',
            name: 'Bất cứ ai',
          },
        ]}
      />

      <TextInput
        control={control}
        name="content"
        inputProps={{
          label: 'Nội dung',
          fullWidth: true,
          multiline: true,
        }}
      />

      <Stack direction="row" justifyContent="right" gap={1}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          disabled={isSaving}
          onClick={handleSubmit(onSaveWithLoading)}
        >
          Đăng
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostForm;