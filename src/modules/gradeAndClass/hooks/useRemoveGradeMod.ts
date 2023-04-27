import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type RemoveGradeModParams = {
  gradeId: string;
  alumniId: string;
};

type RemoveGradeModResponse = unknown;

type RemoveGradeModError = unknown;

const useRemoveGradeMod = () => {
  const { fetchApi, isLoading } = useApi<
    RemoveGradeModParams,
    RemoveGradeModResponse,
    RemoveGradeModError
  >(
    'RemoveClassMod',
    ({ gradeId, alumniId }) => ({
      method: 'DELETE',
      url: `/api/grades/${gradeId}/grade_mod`,
      params: {
        alumniId,
      },
    }),
    {
      onError: () => {
        toast.error('Xoá đại diện niên khoá thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá đại diện niên khoá thành công');
      },
    },
  );

  return {
    isLoading,
    removeGradeMod: fetchApi,
  };
};

export default useRemoveGradeMod;
