import { setStorage } from '@lib/firebase/methods/setStorage';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import UploadAvatar, { UploadAvatarProps } from '../upload/UploadAvatar';
import uniqid from 'uniqid';
import { Box, FormLabel } from '@mui/material';
import { SxProps } from '@mui/material';

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  inputProps?: Omit<UploadAvatarProps, 'file'> & {
    label?: string;
    onChange?: (url: string) => void;
    disabled?: boolean;
  };
  containerSx?: SxProps;
};

const UploadAvatarInput = <T extends FieldValues>({
  control,
  name,
  inputProps,
  containerSx,
}: TextInputProps<T>) => {
  const handleDrop = async (acceptedFiles: File[]) => {
    const { uploadAvatar } = setStorage();
    const file = acceptedFiles[0];
    const toastId = new Date().getMilliseconds();

    try {
      toast.loading('Đang xử lý ảnh...', {
        toastId,
      });
      const url = await uploadAvatar(uniqid(), file);

      toast.dismiss(toastId);
      toast.success('Đã xử lý xong');

      return url;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }

    return null;
  };

  return (
    <Box sx={containerSx}>
      <FormLabel sx={{ ml: 2 }}>{inputProps?.label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <UploadAvatar
            // {...field}
            {...inputProps}
            file={field.value ? field.value : '/default_avatar.png'}
            onDrop={async files => {
              const url = await handleDrop(files);
              if (url) {
                field.onChange(url);
                if (inputProps?.onChange) {
                  inputProps.onChange(url);
                }
              }
            }}
          />
        )}
      />
    </Box>
  );
};

export default UploadAvatarInput;
