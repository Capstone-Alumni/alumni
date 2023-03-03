import { setStorage } from '@lib/firebase/methods/setStorage';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import UploadBackground, {
  UploadBackgroundProps,
} from '../upload/UploadBackground';
import uniqid from 'uniqid';
import { Box, FormLabel, SxProps } from '@mui/material';

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  inputProps?: Omit<UploadBackgroundProps, 'file'> & {
    label?: string;
  };
  containerSx?: SxProps;
  isPreview?: boolean;
};

const UploadBackgroundInput = <T extends FieldValues>({
  control,
  name,
  inputProps,
  containerSx,
  isPreview,
}: TextInputProps<T>) => {
  const handleDrop = async (acceptedFiles: File[]) => {
    const { uploadBackground } = setStorage();
    const file = acceptedFiles[0];
    const toastId = new Date().getMilliseconds();

    try {
      toast.loading('Đang xử lý ảnh...', {
        toastId,
      });
      const url = await uploadBackground(uniqid(), file);

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
        render={({ field }) =>
          isPreview ? (
            <img
              src={field.value}
              height="auto"
              style={{ objectFit: 'contain', width: 'auto' }}
            />
          ) : (
            <UploadBackground
              // {...field}
              {...inputProps}
              file={field.value}
              onDrop={async (files) => {
                const url = await handleDrop(files);
                field.onChange(url);
              }}
            />
          )
        }
      />
    </Box>
  );
};

export default UploadBackgroundInput;
