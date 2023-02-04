import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { GetInformationProps } from '../types';

type GetInformationDataResponse = {
  data: GetInformationProps;
  status: true;
};

type GetInformationDataError = unknown;

const queryGetUserInformationById = (id?: string) => {
  const { fetchApi, data, isLoading } = useApi<
    { id: string },
    GetInformationDataResponse,
    GetInformationDataError
  >('getUserInformation', () => ({
    method: 'GET',
    url: `/api/users/${id}/information`
  }));

  useEffect(() => {
    if (!id) return;
    fetchApi();
  }, [id]);

  const reload = (id: string) => {
    fetchApi({ id });
  };

  return {
    data,
    isLoading,
    getUserInformationById: fetchApi,
    reload,
  };
};

export default queryGetUserInformationById;
