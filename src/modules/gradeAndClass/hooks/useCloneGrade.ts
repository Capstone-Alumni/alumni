import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CloneGradeParams = {
  gradeId: string;
};

type CloneGradeResponse = unknown;

type CloneGradeError = AxiosError<any>;

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
      onError: ({ response }) => {
        if (response?.data?.message?.includes('existed')) {
          toast.error('Niên khoá tiếp theo đã tồn tại');
        } else if (response?.data?.message?.includes('not exist')) {
          toast.error('Không tìm thấy niên khoá để sao chép');
        } else {
          toast.error('Xảy ra lỗi, vui lòng thử lại');
        }
      },
      onSuccess: () => {
        toast.success('Sao chép thành công');
      },
    },
  );

  return {
    isLoading,
    cloneGrade: fetchApi,
  };
};

export default useCloneGrade;
