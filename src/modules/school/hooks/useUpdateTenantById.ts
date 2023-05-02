import { Tenant } from '@share/states';
import getTenantHost from '@share/utils/getTenantHost';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { EditSChoolFormValues } from '../components/EditSchoolForm';

type UpdateTenantByIdDataParams = {
  id: string;
  provinceName?: string;
  cityName?: string;
} & EditSChoolFormValues;

type UpdateTenantByIdDataResponse = {
  data: Tenant;
};

type UpdateTenantByIdDataError = AxiosError;

const useUpdateTenantById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateTenantByIdDataParams,
    UpdateTenantByIdDataResponse,
    UpdateTenantByIdDataError
  >(
    'updateTenantById',
    ({ id, ...values }) => ({
      method: 'PUT',
      url: `/platformHost/api/tenants/${id}`,
      data: values,
    }),
    {
      onError: ({ response }: AxiosError) => {
        if (response?.status === 400) {
          toast.error('Subdomain đã tồn tại');
        } else if (response?.status === 403) {
          toast.error('Không được cập nhập subdomain');
        } else {
          toast.error('Cập nhập thất bại');
        }
      },
      onSuccess: ({ data }) => {
        toast.success('Cập nhập thành công');
        // router.push('/dashboard/tenants');
        window.open(getTenantHost(data.subdomain), '_self');
      },
    },
  );

  return {
    isLoading,
    updateTenantById: fetchApi,
  };
};

export default useUpdateTenantById;
