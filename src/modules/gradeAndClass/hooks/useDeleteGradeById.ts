import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type DeleteGradeByIdDataParams = {
  gradeId: string;
};

type DeleteGradeByIdDataResponse = unknown;

type DeleteGradeByIdDataError = unknown;

const useDeleteGradeById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteGradeByIdDataParams,
    DeleteGradeByIdDataResponse,
    DeleteGradeByIdDataError
  >(
    'deleteGradeById',
    ({ gradeId }) => ({
      method: 'DELETE',
      url: `/api/grades/${gradeId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá niên khoá thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá niên khoá thành công');
      },
    },
  );

  return {
    isLoading,
    deleteGradeById: fetchApi,
  };
};

export default useDeleteGradeById;
