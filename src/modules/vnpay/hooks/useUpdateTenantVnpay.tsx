import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { VnpayFormValues } from '../components/VnpayForm';
import { VnpayConfig } from '../types';

type UpdateTenantVnpayDataParams = {
  id: string;
} & VnpayFormValues;

type UpdateTenantVnpayDataResponse = {
  data: VnpayConfig;
};

type UpdateTenantVnpayDataError = AxiosError;

const useUpdateTenantVnpay = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateTenantVnpayDataParams,
    UpdateTenantVnpayDataResponse,
    UpdateTenantVnpayDataError
  >(
    'updateTenantVnpay',
    ({ id, ...values }) => ({
      method: 'PUT',
      url: `/platformHost/api/tenants/${id}/vnpay`,
      data: values,
    }),
    {
      onError: () => {
        toast.error('Cập nhật thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useUpdateTenantVnpay;
