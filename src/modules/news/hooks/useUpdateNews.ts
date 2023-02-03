import useApi from 'src/modules/share/hooks/useApi';

type UpdateNewsParams = {
  newsId: string;
  title?: string;
  content?: string;
  isPublic?: boolean;
};

type UpdateNewsSuccessResponse = {
  status: boolean;
  data: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
  };
};

type UpdateNewsError = {
  status: boolean;
  message: string;
};

type UpdateNewsResponse = UpdateNewsSuccessResponse | UpdateNewsSuccessResponse;

const useUpdateNews = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateNewsParams,
    UpdateNewsResponse,
    UpdateNewsError
  >(
    'updateNews',
    ({ newsId, title, content, isPublic }) => ({
      method: 'PUT',
      url: `/api/news/${newsId}`,
      data: {
        title,
        content,
        isPublic,
      },
    }),
    {
      onSuccess: () => {
        window.location.reload();
      },
    },
  );

  return {
    isLoading,
    updateNews: fetchApi,
  };
};

export default useUpdateNews;
