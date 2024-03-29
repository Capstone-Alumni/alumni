import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type RemoveClassModParams = {
  classId: string;
  alumniId: string;
};

type RemoveClassModResponse = unknown;

type RemoveClassModError = unknown;

const useRemoveClassMod = () => {
  const { fetchApi, isLoading } = useApi<
    RemoveClassModParams,
    RemoveClassModResponse,
    RemoveClassModError
  >(
    'RemoveClassMod',
    ({ classId, alumniId }) => ({
      method: 'DELETE',
      url: `/api/classes/${classId}/class_mod`,
      params: {
        alumniId,
      },
    }),
    {
      onError: () => {
        toast.error('Xoá đại diện lớp thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá đại diện lớp thành công');
      },
    },
  );

  return {
    isLoading,
    removeClassMod: fetchApi,
  };
};

export default useRemoveClassMod;
