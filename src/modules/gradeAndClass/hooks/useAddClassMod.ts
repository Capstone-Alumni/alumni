import useApi from 'src/modules/share/hooks/useApi';

type AddClassModParams = {
  classId: string;
  alumniId: string;
};

type AddClassModResponse = unknown;

type AddClassModError = unknown;

const useAddClassMod = () => {
  const { fetchApi, isLoading } = useApi<
    AddClassModParams,
    AddClassModResponse,
    AddClassModError
  >('addClassMod', ({ classId, alumniId }) => ({
    method: 'POST',
    url: `/api/classes/${classId}/class_mod`,
    data: {
      alumniId,
    },
  }));

  return {
    isLoading,
    addClassMod: fetchApi,
  };
};

export default useAddClassMod;
