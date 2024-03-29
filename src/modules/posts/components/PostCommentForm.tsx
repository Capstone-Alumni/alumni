import { InputAdornment, Stack, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextInput from '@share/components/form/TextInput';
import MyAvatar from '@share/components/MyAvatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { useRecoilValue } from 'recoil';
import { currentUserInformationDataAtom } from '@share/states';
import { PostComment } from '../type';

export type PostCommentFormValues = {
  content: string;
};

const validationSchema = yup.object({
  content: yup.string(),
});

const PostCommentForm = ({
  onSave,
  data,
}: {
  data?: PostComment;
  onSave: (values: PostCommentFormValues) => Promise<any>;
}) => {
  const theme = useTheme();
  const currentUserInformation = useRecoilValue(currentUserInformationDataAtom);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      content: data?.content ?? '',
    },
    resolver,
  });

  const onSubmit = async (values: PostCommentFormValues) => {
    if (!values.content.length) {
      return;
    }

    await onSave(values);
    reset();
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <MyAvatar
        size="small"
        displayName={currentUserInformation?.information?.fullName}
        photoUrl={currentUserInformation?.information?.avatarUrl}
      />
      <TextInput
        control={control}
        name="content"
        inputProps={{
          onKeyPress: e => {
            if (e.key === 'Enter') {
              handleSubmit(onSubmit)();
            }
          },
          placeholder: 'Bình luận công khai...',
          size: 'small',
          fullWidth: true,
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ '&:hover': { cursor: 'pointer ' } }}
                />
              </InputAdornment>
            ),
            style: {
              borderRadius: theme.shape.borderRadiusMd,
            },
          },
        }}
      />
    </Stack>
  );
};

export default PostCommentForm;
