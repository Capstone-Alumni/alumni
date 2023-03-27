import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

type CreateManyMemberParams = {
  tenantId: string;
  data: MemberFormValues[];
};

type CreateManyMemberResponse = unknown;

type CreateManyMemberError = unknown;

const useCreateManyMember = () => {
  const { fetchApi, isLoading } = useApi<
    CreateManyMemberParams,
    CreateManyMemberResponse,
    CreateManyMemberError
  >(
    'createManyMember',
    ({ data, tenantId }) => ({
      method: 'POST',
      url: '/platformHost/api/members/patch',
      data: {
        tenantId,
        data,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
    },
  );

  return {
    isLoading,
    createManyMember: fetchApi,
  };
};

export default useCreateManyMember;
