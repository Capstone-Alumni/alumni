import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateManyMemberTenantParams = {
  data: Array<MemberFormValues & { alumniId: string }>;
};

type CreateManyMemberTenantResponse = {
  data: {
    newAlumni: Array<MemberFormValues & { alumniId: string }>;
    existingAlumni: Array<MemberFormValues & { alumniId: string }>;
  };
  status: boolean;
};

type CreateManyMemberTenantError = unknown;

const useCreateManyMemberTenant = () => {
  const { fetchApi, isLoading } = useApi<
    CreateManyMemberTenantParams,
    CreateManyMemberTenantResponse,
    CreateManyMemberTenantError
  >(
    'createManyMemberTenantTenant',
    ({ data }) => ({
      method: 'POST',
      url: '/api/members/patch',
      data: {
        data,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      // onSuccess: () => {
      //   toast.success('Thêm thành viên thành công');
      // },
    },
  );

  return {
    isLoading,
    createManyMemberTenant: fetchApi,
  };
};

export default useCreateManyMemberTenant;
