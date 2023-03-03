import { currentUserInformationDataAtom, UserInformation } from '@share/states';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';

type GetGetCurrentUserInformationParams = {
  id: string;
};

type GetGetCurrentUserInformationResponse = {
  data: UserInformation;
};

type GetGetCurrentUserInformationError = AxiosError;

const useGetCurrentUserInformation = () => {
  const setCurrentUserInformation = useSetRecoilState(
    currentUserInformationDataAtom,
  );

  const { fetchApi, isLoading } = useApi<
    GetGetCurrentUserInformationParams,
    GetGetCurrentUserInformationResponse,
    GetGetCurrentUserInformationError
  >(
    'GetCurrentUserInformation',
    ({ id }) => ({
      method: 'GET',
      url: `/api/users/${id}/information`,
    }),
    {
      onSuccess: ({ data }) => {
        setCurrentUserInformation(data);
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useGetCurrentUserInformation;
