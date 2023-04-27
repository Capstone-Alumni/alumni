import { Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';
import { useForm } from 'react-hook-form';
import Checkbox from '@share/components/form/Checkbox';
import CurrencyInput from '@share/components/CurrencyInput';

const FundTransactionForm = ({
  fundId,
  maxDonate,
  canDonate,
  reminingAmount,
}: {
  fundId: string;
  maxDonate: number;
  canDonate: boolean;
  reminingAmount: number;
}) => {
  const { fetchApi, isLoading } = useCreateFundTransaction();

  const validationSchema = yup.object({
    amount: yup
      .number()
      .max(maxDonate, `Số tiền tối đa là ${maxDonate}`)
      .required('Bắt buộc nhập'),
    incognito: yup.boolean().required('Bắt buộc'),
  });

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      amount: maxDonate < 100000 ? maxDonate : 100000,
      incognito: false,
    },
  });

  const handleDonate = async ({
    amount,
    incognito,
  }: {
    amount: number;
    incognito: boolean;
  }) => {
    if (canDonate && amount <= reminingAmount) {
      await fetchApi({ fundId: fundId, amount: amount, incognito: incognito });
    } else {
      toast.info(
        'Không thể ủng hộ. Thời gian gây quỹ đã kết thúc hoặc quỹ đã đạt số tiền mong muốn',
      );
    }
  };

  return (
    <Stack direction="column" gap={1}>
      <CurrencyInput
        control={control}
        name="amount"
        inputProps={{
          label: 'Số tiền ủng hộ',
        }}
      />
      <Checkbox
        control={control}
        name="incognito"
        inputProps={{
          label: 'Tôi muốn ủng hộ ẩn danh',
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
