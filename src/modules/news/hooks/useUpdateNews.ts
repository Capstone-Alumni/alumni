import useApi from 'src/modules/share/hooks/useApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type UpdateNewsParams = {
  newsId: string;
  title?: string;
  content?: string;
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
  const router = useRouter();
  const { fetchApi, isLoading } = useApi<
    UpdateNewsParams,
    UpdateNewsResponse,
    UpdateNewsError
  >(
    'updateNews',
    ({ newsId, title, content }) => ({
      method: 'PUT',
      url: `/api/news/${newsId}`,
      data: {
        title,
        content,
      },
    }),
    {
      onSuccess: () => {
        toast.success('Đăng tin thành công');
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
