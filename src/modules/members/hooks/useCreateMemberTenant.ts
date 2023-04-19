import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateMemberTenantParams = MemberFormValues & {
  tenantId: string;
  alumniId?: string;
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
        toast.error('Thêm thành viên thất bại');
      },
      onSuccess: () => {
        toast.success('Thêm thành viên thành công');
      },
    },
  );

  return {
    isLoading,
    createMemberTenant: fetchApi,
  };
};

export default useCreateMemberTenant;
