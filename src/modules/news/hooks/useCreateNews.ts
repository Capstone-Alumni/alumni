import useApi from 'src/modules/share/hooks/useApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type CreateNewsParams = {
  title: string;
  content: string;
  newsImageUrl?: string;
};

type CreateNewsSuccessResponse = {
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

type CreateNewsError = {
  status: boolean;
  message: string;
};

type CreateNewsResponse = CreateNewsSuccessResponse | CreateNewsError;
const useCreateNews = () => {
  const router = useRouter();
  const { fetchApi, isLoading } = useApi<
    CreateNewsParams,
    CreateNewsResponse,
    CreateNewsError
  >(
    'createNews',
    ({ title, content, newsImageUrl }) => ({
      method: 'POST',
      url: '/api/news',
      data: {
        title,
        content,
        newsImageUrl,
      },
    }),
    {
      onSuccess: (data: CreateNewsResponse) => {
        toast.success('Đăng tin thành công');
        const { id } = (data as CreateNewsSuccessResponse).data;
        router.replace(`/admin/action/news/${id}`);
      },
    },
  );

  return {
    isLoading,
    createNews: fetchApi,
  };
};

export default useCreateNews;
