import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type UpdateGradeByIdDataParams = {
  gradeId: string;
  code: string;
  startYear: number;
  endYear: number;
};

type UpdateGradeByIdDataResponse = unknown;

type UpdateGradeByIdDataError = unknown;

const useUpdateGradeById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateGradeByIdDataParams,
    UpdateGradeByIdDataResponse,
    UpdateGradeByIdDataError
  >(
    'updateGradeById',
    ({ gradeId, code, startYear, endYear }) => ({
      method: 'PUT',
      url: `/api/grades/${gradeId}`,
      data: {
        code,
        startYear,
        endYear,
      },
    }),
    {
      onError: () => {
        toast.error('Cập nhập thông tin niên khoá thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhập thông tin niên khoá thành công');
      },
    },
  );

  return {
    isLoading,
    updateGradeById: fetchApi,
  };
};

export default useUpdateGradeById;
