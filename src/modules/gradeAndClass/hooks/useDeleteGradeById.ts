import useApi from 'src/modules/share/hooks/useApi';

type DeleteGradeByIdDataParams = {
  gradeId: string;
};

type DeleteGradeByIdDataResponse = unknown;

type DeleteGradeByIdDataError = unknown;

const useDeleteGradeById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteGradeByIdDataParams,
    DeleteGradeByIdDataResponse,
    DeleteGradeByIdDataError
  >('deleteGradeById', ({ gradeId }) => ({
    method: 'DELETE',
    url: `/api/grades/${gradeId}`,
  }));

  return {
    isLoading,
    deleteGradeById: fetchApi,
  };
};

export default useDeleteGradeById;
