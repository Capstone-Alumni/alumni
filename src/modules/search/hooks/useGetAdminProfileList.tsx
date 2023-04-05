import { UserInformation } from '@share/type';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { ACCESS_LEVEL } from 'src/modules/members/types';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminProfileListDataAtom } from '../states';

type GetAdminProfileListParams = unknown;

export type GetAdminProfileListData = {
  totalItems: number;
  items: Array<{
    id: string;
    accessLevel: ACCESS_LEVEL;
    information?: UserInformation;
  }>;
  itemPerPage: number;
};

type GetAdminProfileListResponse = {
  data: GetAdminProfileListData;
  status: true;
};

type GetAdminProfileListError = AxiosError;

const useGetAdminProfileList = () => {
  const [state, setState] = useRecoilState(getAdminProfileListDataAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetAdminProfileListParams,
    GetAdminProfileListResponse,
    GetAdminProfileListError
  >(
    'GetAdminProfileList',
    () => ({
      method: 'GET',
      url: '/api/admin_profile',
      params: {
        page: 1,
        limit: 20,
      },
    }),
    {
      onSuccess: ({ data }) => {
        setState(data);
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    data,
  };
};

export default useGetAdminProfileList;
