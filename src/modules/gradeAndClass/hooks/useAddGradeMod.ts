import useApi from 'src/modules/share/hooks/useApi';

type AddGradeModParams = {
  gradeId: string;
  alumniId: string;
};

type AddGradeModResponse = unknown;

type AddGradeModError = unknown;

const useAddGradeMod = () => {
  const { fetchApi, isLoading } = useApi<
    AddGradeModParams,
    AddGradeModResponse,
    AddGradeModError
  >('addClassMod', ({ gradeId, alumniId }) => ({
    method: 'POST',
    url: `/api/grades/${gradeId}/grade_mod`,
    data: {
      alumniId,
    },
  }));

  return {
    isLoading,
    addGradeMod: fetchApi,
  };
};

export default useAddGradeMod;
