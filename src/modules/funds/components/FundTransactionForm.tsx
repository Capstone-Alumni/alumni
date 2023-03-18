import { Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';
import { useForm } from 'react-hook-form';
import TextInput from '@share/components/form/TextInput';

const FundTransactionForm = ({
  fundId,
  maxDonate,
  canDonate,
}: {
  fundId: string;
  maxDonate: number;
  canDonate: boolean;
}) => {
  const { fetchApi, isLoading } = useCreateFundTransaction();

  const validationSchema = yup.object({
    amount: yup
      .number()
      .max(maxDonate, `Số tiền tối đa là ${maxDonate}`)
      .required('Bắt buộc nhập'),
  });

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      amount: maxDonate < 100000 ? maxDonate : 100000,
    },
  });

  const handleDonate = async ({ amount }: { amount: number }) => {
    if (canDonate) {
      await fetchApi({ fundId: fundId, amount: amount });
    } else {
      toast.info(
        'Không thể ủng hộ. Thời gian gây quỹ đã kết thúc hoặc quỹ đã đạt số tiền mong muốn',
      );
    }
  };

  return (
    <Stack direction="column" gap={1}>
      <TextInput
        control={control}
        name="amount"
        inputProps={{
          label: 'Số tiền ủng hộ',
          type: 'number',
        }}
      />
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={handleSubmit(handleDonate)}
      >
        Ủng hộ ngay
      </Button>
    </Stack>
  );
};

export default FundTransactionForm;
