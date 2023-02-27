import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { PostCommentFormValues } from '../components/PostCommentForm';
import { postCommentListDataAtomFamily } from '../state';
import { PostComment } from '../type';

type CreatePostCommentParams = PostCommentFormValues;

type CreatePostCommentResponse = {
  data: PostComment;
};

type CreatePostCommentError = AxiosError;

const useCreatePostComment = (postId: string) => {
  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const [postCommentListData, setPostCommentListData] = useRecoilState(
    postCommentListDataAtom,
  );

  const { fetchApi, isLoading } = useApi<
    CreatePostCommentParams,
    CreatePostCommentResponse,
    CreatePostCommentError
  >(
    'createPostComment',
    data => ({
      method: 'POST',
      url: `/api/posts/${postId}/comments`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Bình luận bị lỗi');
      },
      onSuccess: ({ data }) => {
        // toast.success('Tạo bài đăng thất bại');
        setPostCommentListData(prev => [data, ...prev]);
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreatePostComment;
