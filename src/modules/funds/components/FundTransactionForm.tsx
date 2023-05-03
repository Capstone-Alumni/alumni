import { Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';
import { useForm } from 'react-hook-form';
import Checkbox from '@share/components/form/Checkbox';
import CurrencyInput from '@share/components/CurrencyInput';
import { formatAmountMoney } from '../utils';

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
      .typeError('Bắt buộc')
      .min(10000, 'Số tiền tối thiểu là 10,000đ')
      .max(maxDonate / 100, `Số tiền tối đa là ${formatAmountMoney(maxDonate)}`)
      .required('Bắt buộc nhập'),
    incognito: yup.boolean().required('Bắt buộc'),
  });

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    resolver,
    defaultValues: {
      amount: maxDonate < 10000 ? maxDonate : 10000,
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
    if (canDonate) {
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
