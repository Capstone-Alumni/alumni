import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';
import useCreateMemberTenant from './useCreateMemberTenant';
import { Alumni } from '@share/states';
import useGetMemberList from './useGetMemberList';

type CreateMemberPlatformParams = MemberFormValues & {
  tenantId: string;
  password?: string;
};

type CreateMemberPlatformResponse = {
  data: {
    newAlumni: Alumni;
    inputtedData: CreateMemberPlatformParams;
  };
};

type CreateMemberPlatformError = unknown;

const useCreateMemberPlatform = () => {
  const { createMemberTenant } = useCreateMemberTenant();
  const { reload } = useGetMemberList();

  const { fetchApi, isLoading } = useApi<
    CreateMemberPlatformParams,
    CreateMemberPlatformResponse,
    CreateMemberPlatformError
  >(
    'createMemberPlatform',
    data => ({
      method: 'POST',
      url: '/platformHost/api/members',
      data,
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      onSuccess: async ({ data }) => {
        await createMemberTenant({
          ...data.inputtedData,
          tenantId: data.newAlumni.tenantId,
          alumniId: data.newAlumni.id,
        });
        reload();
      },
    },
  );

  return {
    isLoading,
    createMemberPlatform: fetchApi,
  };
};

export default useCreateMemberPlatform;
