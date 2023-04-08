import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CreateManyGradeParams = {
  data: Array<{
    gradeCode: string;
    className: string;
  }>;
};

type CreateManyGradeResponse = unknown;

type CreateManyGradeError = unknown;

const useCreateManyGrade = () => {
  const { fetchApi, isLoading } = useApi<
    CreateManyGradeParams,
    CreateManyGradeResponse,
    CreateManyGradeError
  >(
    'createManyGrade',
    ({ data }) => ({
      method: 'POST',
      url: '/api/grades/patch',
      data: {
        data,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
    },
  );

  return {
    isLoading,
    createManyGrade: fetchApi,
  };
};

export default useCreateManyGrade;
