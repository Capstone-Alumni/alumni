import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { postCommentListDataAtomFamily } from '../state';
import { PostComment } from '../type';

type DeleteCommentParams = never;

type DeleteCommentResponse = {
  data: PostComment;
};

type DeleteCommentError = AxiosError;

const useDeleteComment = (postId: string, commentId: string) => {
  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const [postCommentListData, setPostCommentListData] = useRecoilState(
    postCommentListDataAtom,
  );
  const [newDelete, setNewDelete] = useState<PostComment | null>(null);

  const { fetchApi, isLoading } = useApi<
    DeleteCommentParams,
    DeleteCommentResponse,
    DeleteCommentError
  >(
    'DeleteComment',
    () => ({
      method: 'DELETE',
      url: `/api/posts/${postId}/comments/${commentId}`,
    }),
    {
      onSuccess: ({ data }) => {
        setNewDelete(data);
      },
    },
  );

  useEffect(() => {
    if (newDelete) {
      const CommentIndex = postCommentListData.findIndex(
        data => data.id === commentId,
      );

      if (CommentIndex < 0) {
        return;
      }

      const newCommentListData = [...postCommentListData];
      newCommentListData.splice(CommentIndex, 1);

      setPostCommentListData(newCommentListData);
    }
  }, [newDelete]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useDeleteComment;
