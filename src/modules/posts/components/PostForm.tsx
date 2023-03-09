import { Stack, Typography, useTheme } from '@mui/material';
import SelectInput from '@share/components/form/SelectInput';
import MyAvatar from '@share/components/MyAvatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Button } from '@mui/material';
import { useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import { Post } from '../type';

export type PostFormValues = {
  content: string;
  publicity: string;
};

const validationSchema = yup.object({
  content: yup.string().required(),
  publicity: yup.string().required(),
});

const PostForm = ({
  data,
  onClose,
  onSave,
}: {
  data?: Post;
  onClose: () => void;
  onSave: (values: PostFormValues) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      content: data?.content ?? '',
      publicity: data?.publicity ?? 'ALUMNI',
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
        <MyAvatar
          photoUrl={
            data?.authorInformation.avatarUrl ||
            currentUserInformation.avatarUrl
          }
          displayName={
            data?.authorInformation.fullName || currentUserInformation.fullName
          }
        />

        <Typography fontWeight={600}>
          {currentUserInformation.fullName}
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

      <RichTextInput
        control={control}
        name="content"
        inputProps={{
          placeholder: 'Nội dung',
        }}
      />

      <Stack direction="row" justifyContent="right" gap={1}>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          disabled={isSaving}
          onClick={handleSubmit(onSaveWithLoading)}
        >
          {data ? 'Lưu' : 'Đăng'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostForm;
