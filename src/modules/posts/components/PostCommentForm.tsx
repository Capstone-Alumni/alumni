import { InputAdornment, Stack, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextInput from '@share/components/form/TextInput';
import MyAvatar from '@share/components/MyAvatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

export type PostCommentFormValues = {
  content: string;
};

const validationSchema = yup.object({
  content: yup.string(),
});

const PostCommentForm = ({
  onSave,
  onClose,
}: {
  onSave: (values: PostCommentFormValues) => void;
  onClose?: () => void;
}) => {
  const theme = useTheme();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      content: '',
    },
    resolver,
  });

  const onSubmit = (values: PostCommentFormValues) => {
    if (!values.content.length) {
      return;
    }

    onSave(values);
    reset();
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <MyAvatar />
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
                <SendIcon color="primary" onClick={handleSubmit(onSubmit)} />
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
