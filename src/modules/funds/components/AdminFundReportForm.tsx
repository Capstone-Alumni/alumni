import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { FundReport } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, Stack, useTheme } from '@mui/material';
// import SelectInput from '@share/components/form/SelectInput';
// import { Typography } from '@mui/material';
import { useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';

export type AdminFundReportFormValues = {
  title: string;
  content: string;
};

const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});

const AdminFundReportForm = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: FundReport;
  onClose?: () => void;
  onSubmit: (values: AdminFundReportFormValues) => unknown;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });

  const onSubmitWithStatus = async (values: AdminFundReportFormValues) => {
    setIsSaving(true);
    await onSubmit(values);
    setIsSaving(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: theme.spacing(2),
      }}
    >
      <TextInput
        control={control}
        name="title"
        inputProps={{ label: 'Tiêu đề', fullWidth: true }}
      />

      <RichTextInput
        control={control}
        name="content"
        inputProps={{ placeholder: 'Nội dung', containerSx: { width: '100%' } }}
      />

      <Stack direction="row" gap={2}>
        {onClose ? (
          <Button variant="outlined" onClick={onClose}>
            Huỷ
          </Button>
        ) : null}

        <Button
          variant="contained"
          disabled={isSaving}
          onClick={handleSubmit(onSubmitWithStatus)}
        >
          Lưu
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminFundReportForm;
