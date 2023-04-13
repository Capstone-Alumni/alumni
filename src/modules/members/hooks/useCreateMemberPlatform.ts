import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateMemberPlatformParams = MemberFormValues & {
  tenantId: string;
};

type CreateMemberPlatformResponse = unknown;

type CreateMemberPlatformError = unknown;

const useCreateMemberPlatform = () => {
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
        toast.error('Tao thanh vien that bai');
      },
    },
  );

  return {
    isLoading,
    createMemberPlatform: fetchApi,
  };
};

export default useCreateMemberPlatform;
