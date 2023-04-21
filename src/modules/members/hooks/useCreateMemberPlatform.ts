import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';
import useCreateMemberTenant from './useCreateMemberTenant';
import { Alumni } from '@share/states';

type CreateMemberPlatformParams = MemberFormValues & {
  tenantId: string;
};

type CreateMemberPlatformResponse = {
  data: {
    newAlumni: Alumni;
    inputtedData: CreateMemberPlatformParams;
  };
  status: boolean;
};

type CreateMemberPlatformError = unknown;

const useCreateMemberPlatform = () => {
  const { createMemberTenant, isLoading: isCreatingMemberTenant } =
    useCreateMemberTenant();

  const { fetchApi, isLoading: isCreatingMemberPlatform } = useApi<
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
    },
  );

  const isLoading = isCreatingMemberPlatform || isCreatingMemberTenant;

  const createMemberPlatform = async (params: CreateMemberPlatformParams) => {
    const res = await fetchApi(params);
    if (res?.status) {
      await createMemberTenant({
        ...params,
        alumniId: res.data.newAlumni.id,
      });
    }
  };

  return {
    isLoading,
    createMemberPlatform,
  };
};

export default useCreateMemberPlatform;
