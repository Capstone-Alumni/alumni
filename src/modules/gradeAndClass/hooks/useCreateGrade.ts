import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

export type CreateGradeParams = {
  code: string;
  startYear: number;
  endYear: number;
};

const useCreateGrade = () => {
  const { fetchApi, isLoading } = useApi(
    'createGrade',
    (values: CreateGradeParams) => ({
      method: 'POST',
      url: '/api/grades',
      data: values,
    }),
    {
      onError: () => {
        toast.error('Niên khoá bị trùng lặp cả năm bắt đầu và năm kết thúc');
      },
    },
  );

  return {
    isLoading,
    createGrade: fetchApi,
  };
};

export default useCreateGrade;
