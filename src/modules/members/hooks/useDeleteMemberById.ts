import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type DeleteMemberByIdDataParams = {
  memberId: string;
};

type DeleteMemberByIdDataResponse = unknown;

type DeleteMemberByIdDataError = unknown;

const useDeleteMemberById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteMemberByIdDataParams,
    DeleteMemberByIdDataResponse,
    DeleteMemberByIdDataError
  >(
    'deleteMemberById',
    ({ memberId }) => ({
      method: 'DELETE',
      url: `/platformHost/api/members/${memberId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá thành viên thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá thành viên thành công');
      },
    },
  );

  return {
    isLoading,
    deleteMemberById: fetchApi,
  };
};

export default useDeleteMemberById;
