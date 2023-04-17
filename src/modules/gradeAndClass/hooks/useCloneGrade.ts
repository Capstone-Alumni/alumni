import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CloneGradeParams = {
  gradeId: string;
};

type CloneGradeResponse = unknown;

type CloneGradeError = unknown;

const useCloneGrade = () => {
  const { fetchApi, isLoading } = useApi<
    CloneGradeParams,
    CloneGradeResponse,
    CloneGradeError
  >(
    'CloneGrade',
    ({ gradeId }) => ({
      method: 'POST',
      url: `/api/grades/${gradeId}/clone`,
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi, vui lòng thử lại');
      },
    },
  );

  return {
    isLoading,
    cloneGrade: fetchApi,
  };
};

export default useCloneGrade;
