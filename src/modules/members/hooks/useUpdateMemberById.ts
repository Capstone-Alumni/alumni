import useApi from 'src/modules/share/hooks/useApi';
import { MemberFormValues } from '../components/MemberForm';

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
  >('updateMemberById', ({ memberId, ...data }) => ({
    method: 'PUT',
    url: `/platformHost/api/members/${memberId}`,
    data: data,
  }));

  return {
    isLoading,
    updateMemberById: fetchApi,
  };
};

export default useUpdateMemberById;
