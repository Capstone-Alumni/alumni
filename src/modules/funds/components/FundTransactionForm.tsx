import { Button, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';

const FundTransactionForm = ({ fundId }: { fundId: string }) => {
  const { fetchApi } = useCreateFundTransaction();
  const [amount, setAmount] = useState(200000);

  return (
    <Box>
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
        onClick={() => fetchApi({ fundId: fundId, amount: amount })}
      >
        Ủng hộ ngay
      </Button>
    </Box>
  );
};

export default FundTransactionForm;
