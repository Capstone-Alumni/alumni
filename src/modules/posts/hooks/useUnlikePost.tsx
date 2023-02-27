import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { postListAtom } from '../state';
import { PostLike } from '../type';

type UnlikePostParams = never;

type UnlikePostResponse = {
  data: PostLike;
};

type UnlikePostError = AxiosError;

const useUnlikePost = (postId: string, userId?: string) => {
  const [postListData, setPostListData] = useRecoilState(postListAtom);
  const [newUnlike, setNewUnlike] = useState<PostLike | null>(null);

  const { fetchApi, isLoading } = useApi<
    UnlikePostParams,
    UnlikePostResponse,
    UnlikePostError
  >(
    'UnlikePost',
    () => ({
      method: 'DELETE',
      url: `/api/posts/${postId}/likes`,
    }),
    {
      onSuccess: ({ data }) => {
        setNewUnlike(data);
      },
    },
  );

  useEffect(() => {
    if (newUnlike) {
      const postIndex = postListData.findIndex(data => data.id === postId);
      const likeIndex = postListData[postIndex].postLikes.findIndex(
        like => like.authorId === userId,
      );

      if (likeIndex < 0) {
        return;
      }

      const postUnlikeData = [...postListData[postIndex].postLikes];
      postUnlikeData.splice(likeIndex, 1);

      const postData = postListData[postIndex];

      const newPostListData = [...postListData];

      newPostListData[postIndex] = {
        ...postData,
        postLikes: postUnlikeData,
      };

      setPostListData(newPostListData);
    }
  }, [newUnlike]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useUnlikePost;
