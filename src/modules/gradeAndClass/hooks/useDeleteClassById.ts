import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type DeleteClassByIdDataParams = {
  classId: string;
};

type DeleteClassByIdDataResponse = unknown;

type DeleteClassByIdDataError = unknown;

const useDeleteClassById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteClassByIdDataParams,
    DeleteClassByIdDataResponse,
    DeleteClassByIdDataError
  >(
    'deleteClassById',
    ({ classId }) => ({
      method: 'DELETE',
      url: `/api/classes/${classId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá lớp thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá lớp thành công');
      },
    },
  );

  return {
    isLoading,
    deleteClassById: fetchApi,
  };
};

export default useDeleteClassById;
