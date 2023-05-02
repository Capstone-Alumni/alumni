import { Stack, Typography, useTheme } from '@mui/material';
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
import { useSearchParams } from 'next/navigation';
import { CreatePostParams } from '../hooks/useCreatePost';

export type PostFormValues = {
  content: string;
};

const validationSchema = yup.object({
  content: yup.string().required('Chưa nhật nội dung'),
});

const PostForm = ({
  data,
  onClose,
  onSave,
}: {
  data?: Post;
  onClose: () => void;
  onSave: (values: CreatePostParams) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const searchParam = useSearchParams();
  const gradeSearchParams = searchParam.get('grade') || 'all';
  const classSearchParams = searchParam.get('class') || 'all';

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      content: data?.content ?? '',
    },
    resolver,
  });

  const onSaveWithLoading = async (values: PostFormValues) => {
    setIsSaving(true);
    await onSave({
      ...values,
      gradeId: gradeSearchParams,
      alumClassId: classSearchParams,
    });
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
            data?.author?.information?.avatarUrl ||
            currentUserInformation?.information?.avatarUrl
          }
          displayName={
            data?.author?.information?.fullName ||
            currentUserInformation?.information?.fullName
          }
        />

        <Typography fontWeight={600}>
          {currentUserInformation?.information?.fullName}
        </Typography>
      </Stack>

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
