import useApi from 'src/modules/share/hooks/useApi';

type UpdateGradeByIdDataParams = {
  gradeId: string;
  code: string;
  startYear: number;
  endYear: number;
};

type UpdateGradeByIdDataResponse = unknown;

type UpdateGradeByIdDataError = unknown;

const useUpdateGradeById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateGradeByIdDataParams,
    UpdateGradeByIdDataResponse,
    UpdateGradeByIdDataError
  >('updateGradeById', ({ gradeId, code, startYear, endYear }) => ({
    method: 'PUT',
    url: `/api/grades/${gradeId}`,
    data: {
      code,
      startYear,
      endYear,
    },
  }));

  return {
    isLoading,
    updateGradeById: fetchApi,
  };
};

export default useUpdateGradeById;
