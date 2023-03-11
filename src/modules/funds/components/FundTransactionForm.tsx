import { Button } from '@mui/material';
import { Box } from '@mui/material';
import useCreateFundTransaction from '../hooks/useCreateFundTransaction';

const FundTransactionForm = ({ fundId }: { fundId: string }) => {
  const { fetchApi } = useCreateFundTransaction();
  return (
    <Box>
      <Button onClick={() => fetchApi({ fundId: fundId })}>Pay</Button>
    </Box>
  );
};

export default FundTransactionForm;
