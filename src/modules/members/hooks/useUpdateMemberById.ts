import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';
import { toast } from 'react-toastify';

type UpdateMemberByIdDataParams = {
  memberId: string;
} & MemberFormValues;

type UpdateMemberByIdDataResponse = unknown;

type UpdateMemberByIdDataError = unknown;

const useUpdateMemberById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateMemberByIdDataParams,
    UpdateMemberByIdDataResponse,
    UpdateMemberByIdDataError
  >(
    'updateMemberById',
    ({ memberId, ...data }) => ({
      method: 'PUT',
      url: `/platformHost/api/members/${memberId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhập thông tin thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhập thông tin thành công');
      },
    },
  );

  return {
    isLoading,
    updateMemberById: fetchApi,
  };
};

export default useUpdateMemberById;
