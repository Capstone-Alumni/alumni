import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { PostCommentFormValues } from '../components/PostCommentForm';
import { postCommentListDataAtomFamily } from '../state';
import { PostComment } from '../type';
import { toast } from 'react-toastify';

type UpdateCommentParams = PostCommentFormValues & {
  commentId: string;
};

type UpdateCommentResponse = {
  data: PostComment;
};

type UpdateCommentError = AxiosError;

const useUpdateComment = (postId: string) => {
  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const [postCommentListData, setPostCommentListData] = useRecoilState(
    postCommentListDataAtom,
  );
  const [newUpdate, setNewUpdate] = useState<PostComment | null>(null);

  const { fetchApi, isLoading } = useApi<
    UpdateCommentParams,
    UpdateCommentResponse,
    UpdateCommentError
  >(
    'UpdateComment',
    ({ commentId, ...data }) => ({
      method: 'PUT',
      url: `/api/posts/${postId}/comments/${commentId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhập bình luận thất bại');
      },
      onSuccess: ({ data }) => {
        toast.success('Cập nhập bình luận thành công');
        setNewUpdate(data);
      },
    },
  );

  useEffect(() => {
    if (newUpdate) {
      const commentIndex = postCommentListData.findIndex(
        data => data.id === newUpdate.id,
      );

      if (commentIndex < 0) {
        return;
      }

      const commentData = postCommentListData[commentIndex];
      const newCommentListData = [...postCommentListData];

      newCommentListData[commentIndex] = {
        ...commentData,
        ...newUpdate,
      };

      setPostCommentListData(newCommentListData);
    }
  }, [newUpdate]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useUpdateComment;
