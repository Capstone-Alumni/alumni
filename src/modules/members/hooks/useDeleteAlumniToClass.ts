import useApi from 'src/modules/share/hooks/useApi';

type DeleteAlumToClassByIdDataParams = {
  memberId: string;
  alumToClassId: string;
};

type DeleteAlumToClassByIdDataResponse = unknown;

type DeleteAlumToClassByIdDataError = unknown;

const useDeleteAlumToClassById = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteAlumToClassByIdDataParams,
    DeleteAlumToClassByIdDataResponse,
    DeleteAlumToClassByIdDataError
  >('deleteAlumToClassById', ({ memberId, alumToClassId }) => ({
    method: 'DELETE',
    url: `/api/members/${memberId}/alum_to_class/${alumToClassId}`,
  }));

  return {
    isLoading,
    deleteAlumToClassById: fetchApi,
  };
};

export default useDeleteAlumToClassById;