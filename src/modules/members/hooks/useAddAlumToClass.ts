import useApi from '@share/hooks/useApi';
import { toast } from 'react-toastify';

type AddAlumniToClassParams = {
  classId: string;
  memberId: string;
};

type AddAlumniToClassResponse = unknown;

type AddAlumniToClassError = unknown;

const useAddAlumniToClass = () => {
  const { fetchApi, isLoading } = useApi<
    AddAlumniToClassParams,
    AddAlumniToClassResponse,
    AddAlumniToClassError
  >(
    'addAlumniToClass',
    ({ classId, memberId }) => ({
      method: 'POST',
      url: `/api/members/${memberId}/alum_to_class`,
      data: {
        classId,
      },
    }),
    {
      onError: (error: any) => {
        const { response } = error;
        const { message } = response.data;
        if (message.includes('Unique constraint failed')) {
          toast.error('Xảy ra lỗi, lớp đã có trong thông tin của bạn');
        } else {
          toast.error('Xảy ra lỗi');
        }
      },
    },
  );

  return {
    isLoading,
    addAlumniToClass: fetchApi,
  };
};

export default useAddAlumniToClass;
