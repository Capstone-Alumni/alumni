import { GetMemberListData } from 'src/modules/members/types';
import useApi from 'src/modules/share/hooks/useApi';

type GetMemberListForRoleDataParams = {
  name: string;
  excludeClassId?: string;
  excludeGradeId?: string;
};

type GetMemberListForRoleDataResponse = {
  data: GetMemberListData;
  status: true;
};

type GetMemberListForRoleDataError = unknown;

const useGetMemberListForRole = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetMemberListForRoleDataParams,
    GetMemberListForRoleDataResponse,
    GetMemberListForRoleDataError
  >(
    'getMemberListForRole',
    params => ({
      method: 'GET',
      url: '/api/members',
      params: {
        page: 1,
        limit: 15,
        ...params,
      },
    }),
    {
      revalidate: false,
    },
  );

  return {
    data,
    isLoading,
    getMemberListForRole: fetchApi,
  };
};

export default useGetMemberListForRole;
