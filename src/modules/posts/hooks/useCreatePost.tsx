import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { PostFormValues } from '../components/PostForm';
import { postListAtom } from '../state';
import { Post } from '../type';

type CreatePostParams = PostFormValues;

type CreatePostResponse = {
  data: Post;
};

type CreatePostError = AxiosError;

const useCreatePost = () => {
  const [postList, setPostList] = useRecoilState(postListAtom);

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
        toast.error('Tạo bài đăng thất bại');
      },
      onSuccess: ({ data }) => {
        toast.success('Tạo bài đăng thành công');
        setPostList(prevState => [data, ...prevState]);
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreatePost;
