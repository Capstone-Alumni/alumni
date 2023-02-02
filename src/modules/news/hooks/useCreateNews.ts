import useApi from 'src/modules/share/hooks/useApi';
import { toast } from 'react-toastify';

type CreateNewsParams = {
  title: string;
  content: string;
};

type CreateNewsResponse = unknown;

type CreateNewsError = unknown;

const useCreateNews = () => {
  const { fetchApi, isLoading } = useApi<
    CreateNewsParams,
    CreateNewsResponse,
    CreateNewsError
  >(
    'createNews',
    ({ title, content }) => ({
      method: 'POST',
      url: '/api/news',
      data: {
        title,
        content,
      },
    }),
    {
      onSuccess: () => {
        toast.success('Đăng tin thành công');
      },
    },
  );

  return {
    isLoading,
    createNews: fetchApi,
  };
};

export default useCreateNews;
