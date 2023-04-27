import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type UpdateNewsParams = {
  newsId: string;
  title?: string;
  content?: string;
  isPublic?: boolean;
  newsImageUrl?: string;
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
    newsImageUrl: string;
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
    ({ newsId, title, content, isPublic, newsImageUrl }) => ({
      method: 'PUT',
      url: `/api/news/${newsId}`,
      data: {
        title,
        content,
        isPublic,
        newsImageUrl,
      },
    }),
    {
      onError: () => {
        toast.error('Cập nhập thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật thành công');
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
