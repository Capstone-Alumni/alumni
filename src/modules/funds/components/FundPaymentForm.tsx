import { Button } from '@mui/material';
import { Box } from '@mui/material';
import useCreateFundPayment from '../hooks/useCreateFundPayment';

const FundPaymentForm = () => {
  const { fetchApi } = useCreateFundPayment();
  return (
    <Box>
      <Button onClick={() => fetchApi()}>Pay</Button>
    </Box>
  );
};

export default FundPaymentForm;
