import useApi from 'src/modules/share/hooks/useApi';

type DeleteClassByIdDataParams = {
  classId: string;
};

type DeleteClassByIdDataResponse = unknown;

type DeleteClassByIdDataError = unknown;

const useDeleteClassById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteClassByIdDataParams,
    DeleteClassByIdDataResponse,
    DeleteClassByIdDataError
  >('deleteClassById', ({ classId }) => ({
    method: 'DELETE',
    url: `/api/classes/${classId}`,
  }));

  return {
    isLoading,
    deleteClassById: fetchApi,
  };
};

export default useDeleteClassById;
