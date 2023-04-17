import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateMemberTenantParams = MemberFormValues & {
  tenantId: string;
};

type CreateMemberTenantResponse = unknown;

type CreateMemberTenantError = unknown;

const useCreateMemberTenant = () => {
  const { fetchApi, isLoading } = useApi<
    CreateMemberTenantParams,
    CreateMemberTenantResponse,
    CreateMemberTenantError
  >(
    'createMemberTenant',
    data => ({
      method: 'POST',
      url: '/api/members',
      data,
    }),
    {
      onError: () => {
        toast.error('Tao thanh vien that bai');
      },
    },
  );

  return {
    isLoading,
    createMemberTenant: fetchApi,
  };
};

export default useCreateMemberTenant;
