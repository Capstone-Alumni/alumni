import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';

const FundTransactionForm = ({
  fundId,
  canDonate,
}: {
  fundId: string;
  canDonate: boolean;
}) => {
  const { fetchApi, isLoading } = useCreateFundTransaction();
  const [amount, setAmount] = useState(200000);

  const handleDonate = async () => {
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
      <TextField
        size="small"
        label="Số tiền ủng hộ"
        type="number"
        autoFocus
        value={amount}
        onChange={e => {
          setAmount(parseInt(e.target.value, 10));
        }}
      />
      <Button
        variant="contained"
        disabled={isLoading}
        onClick={() => handleDonate()}
      >
        Ủng hộ ngay
      </Button>
    </Stack>
  );
};

export default FundTransactionForm;
