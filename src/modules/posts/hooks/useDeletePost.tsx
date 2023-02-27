import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { postListAtom } from '../state';
import { Post } from '../type';

type DeletePostParams = never;

type DeletePostResponse = {
  data: Post;
};

type DeletePostError = AxiosError;

const useDeletePost = (postId: string) => {
  const [postListData, setPostListData] = useRecoilState(postListAtom);
  const [newDelete, setNewDelete] = useState<Post | null>(null);

  const { fetchApi, isLoading } = useApi<
    DeletePostParams,
    DeletePostResponse,
    DeletePostError
  >(
    'DeletePost',
    () => ({
      method: 'DELETE',
      url: `/api/posts/${postId}`,
    }),
    {
      onSuccess: ({ data }) => {
        setNewDelete(data);
      },
    },
  );

  useEffect(() => {
    if (newDelete) {
      const postIndex = postListData.findIndex(data => data.id === postId);

      if (postIndex < 0) {
        return;
      }

      const newPostListData = [...postListData];
      newPostListData.splice(postIndex, 1);

      setPostListData(newPostListData);
    }
  }, [newDelete]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useDeletePost;
