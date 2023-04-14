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
  >('RemoveClassMod', ({ gradeId, alumniId }) => ({
    method: 'DELETE',
    url: `/api/grades/${gradeId}/grade_mod`,
    params: {
      alumniId,
    },
  }));

  return {
    isLoading,
    removeGradeMod: fetchApi,
  };
};

export default useRemoveGradeMod;
