import useApi from 'src/modules/share/hooks/useApi';

type UpdateMemberByIdDataParams = {
  memberId: string;
  accessLevel: string;
  password: string;
};

type UpdateMemberByIdDataResponse = unknown;

type UpdateMemberByIdDataError = unknown;

const useUpdateMemberById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateMemberByIdDataParams,
    UpdateMemberByIdDataResponse,
    UpdateMemberByIdDataError
  >('updateMemberById', ({ memberId, password, accessLevel }) => ({
    method: 'PUT',
    url: `/platformHost/api/members/${memberId}`,
    data: {
      password,
      accessLevel,
    },
  }));

  return {
    isLoading,
    updateMemberById: fetchApi,
  };
};

export default useUpdateMemberById;
