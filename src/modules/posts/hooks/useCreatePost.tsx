import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { PostFormValues } from '../components/PostForm';

type CreatePostParams = PostFormValues;

type CreatePostResponse = unknown;

type CreatePostError = AxiosError;

const useCreatePost = () => {
  const { fetchApi, isLoading } = useApi<
    CreatePostParams,
    CreatePostResponse,
    CreatePostError
  >(
    'createPost',
    data => ({
      method: 'POST',
      url: '/api/posts',
      data: data,
    }),
    {
      onError: () => {
        toast.error('Tạo bài đăng thành công');
      },
      onSuccess: () => {
        toast.success('Tạo bài đăng thất bại');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreatePost;
