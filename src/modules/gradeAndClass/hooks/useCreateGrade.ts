import useApi from 'src/modules/share/hooks/useApi';
import { GradeFormValues } from '../components/GradeForm';

const useCreateGrade = () => {
  const { fetchApi, isLoading } = useApi(
    'createGrade',
    (values: GradeFormValues) => ({
      method: 'POST',
      url: '/api/grades',
      data: values,
    }),
  );

  return {
    isLoading,
    createGrade: fetchApi,
  };
};

export default useCreateGrade;
