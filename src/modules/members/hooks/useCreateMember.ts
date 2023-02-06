import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateMemberParams = MemberFormValues & {
  tenantId: string;
};

type CreateMemberResponse = unknown;

type CreateMemberError = unknown;

const useCreateMember = () => {
  const { fetchApi, isLoading } = useApi<
    CreateMemberParams,
    CreateMemberResponse,
    CreateMemberError
  >(
    'createMember',
    ({ email, password, accessLevel, tenantId }) => ({
      method: 'POST',
      url: '/platformHost/api/members',
      data: {
        email,
        password,
        tenantId,
        accessLevel,
      },
    }),
    {
      onError: () => {
        toast.error('Tao thanh vien that bai');
      },
    },
  );

  return {
    isLoading,
    createMember: fetchApi,
  };
};

export default useCreateMember;
