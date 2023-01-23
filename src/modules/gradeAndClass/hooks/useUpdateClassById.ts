import useApi from 'src/modules/share/hooks/useApi';

type UpdateClassByIdDataParams = {
  classId: string;
  name: string;
  // description: string;
};

type UpdateClassByIdDataResponse = unknown;

type UpdateClassByIdDataError = unknown;

const useUpdateClassById = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateClassByIdDataParams,
    UpdateClassByIdDataResponse,
    UpdateClassByIdDataError
  >('updateClassById', ({ classId, name }) => ({
    method: 'PUT',
    url: `/api/classes/${classId}`,
    data: {
      name,
    },
  }));

  return {
    isLoading,
    updateClassById: fetchApi,
  };
};

export default useUpdateClassById;
