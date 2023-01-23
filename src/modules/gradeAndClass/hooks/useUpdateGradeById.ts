import useApi from 'src/modules/share/hooks/useApi';

type UpdateGradeByIdDataParams = {
  gradeId: string;
  code: string;
  name: string;
};

type UpdateGradeByIdDataResponse = unknown;

type UpdateGradeByIdDataError = unknown;

const useUpdateGradeById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateGradeByIdDataParams,
    UpdateGradeByIdDataResponse,
    UpdateGradeByIdDataError
  >('updateGradeById', ({ gradeId, code, name }) => ({
    method: 'PUT',
    url: `/api/grades/${gradeId}`,
    data: {
      code,
      name,
    },
  }));

  return {
    isLoading,
    updateGradeById: fetchApi,
  };
};

export default useUpdateGradeById;
