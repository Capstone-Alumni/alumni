import useApi from 'src/modules/share/hooks/useApi';
import { ClassFormValues } from '../components/ClassForm';
import { toast } from 'react-toastify';

type CreateClassParams = {
  gradeId: string;
} & ClassFormValues;

type CreateClassResponse = unknown;

type CreateClassError = unknown;

const useCreateClass = () => {
  const { fetchApi, isLoading } = useApi<
    CreateClassParams,
    CreateClassResponse,
    CreateClassError
  >(
    'createClass',
    ({ gradeId, name }) => ({
      method: 'POST',
      url: '/api/classes',
      data: {
        name,
        gradeId,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi, vui lòng thử lại');
      },
      onSuccess: () => {
        toast.success('Thêm lớp thành công');
      },
    },
  );

  return {
    isLoading,
    createClass: fetchApi,
  };
};

export default useCreateClass;
