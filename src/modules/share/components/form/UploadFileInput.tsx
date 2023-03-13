import { setStorage } from '@lib/firebase/methods/setStorage';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';

import uniqid from 'uniqid';
import { Box, FormLabel, SxProps } from '@mui/material';
import { UploadSingleFile } from '../upload';
import { UploadSingleFileProps } from '../upload/UploadSingleFile';

type UploadFileInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  inputProps?: Omit<UploadSingleFileProps, 'file'> & {
    label?: string;
  };
  containerSx?: SxProps;
  onSuccess?: (url: string) => void;
  fileType?: any;
};

const UploadFileInput = <T extends FieldValues>({
  control,
  name,
  inputProps,
  containerSx,
  onSuccess,
  fileType,
}: UploadFileInputProps<T>) => {
  const handleDrop = async (acceptedFiles: File[]) => {
    const { uploadFile } = setStorage();
    const file = acceptedFiles[0];
    const toastId = new Date().getMilliseconds();

    try {
      toast.loading('Đang xử lý file...', {
        toastId,
      });
      const url = await uploadFile(uniqid(), file);

      toast.dismiss(toastId);
      toast.success('Đã xử lý xong');
      if (onSuccess) {
        onSuccess(url);
      }
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
          <UploadSingleFile
            // {...field}
            {...inputProps}
            fileType={fileType}
            file={field.value}
            onDrop={async files => {
              const url = await handleDrop(files);
              field.onChange(url);
            }}
          />
        )}
      />
    </Box>
  );
};

export default UploadFileInput;
