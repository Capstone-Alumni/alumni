import { Button } from '@mui/material';
import { Box } from '@mui/material';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';

const FundTransactionForm = () => {
  const { fetchApi } = useCreateFundTransaction();
  return (
    <Box>
      <Button onClick={() => fetchApi()}>Pay</Button>
    </Box>
  );
};

export default FundTransactionForm;
