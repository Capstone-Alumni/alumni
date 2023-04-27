import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type UpdateClassByIdDataParams = {
  classId: string;
  name: string;
  // description: string;
};

type UpdateClassByIdDataResponse = unknown;

type UpdateClassByIdDataError = unknown;

const useUpdateClassById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateClassByIdDataParams,
    UpdateClassByIdDataResponse,
    UpdateClassByIdDataError
  >(
    'updateClassById',
    ({ classId, name }) => ({
      method: 'PUT',
      url: `/api/classes/${classId}`,
      data: {
        name,
      },
    }),
    {
      onError: () => {
        toast.error('Cập nhập thông tin lớp thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhập thông tin lớp thành công');
      },
    },
  );

  return {
    isLoading,
    updateClassById: fetchApi,
  };
};

export default useUpdateClassById;
