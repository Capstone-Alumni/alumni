import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { postListAtom } from '../state';
import { PostLike } from '../type';

type LikePostParams = never;

type LikePostResponse = {
  data: PostLike;
};

type LikePostError = AxiosError;

const useLikePost = (postId: string) => {
  const [postListData, setPostListData] = useRecoilState(postListAtom);
  const [newLike, setNewLike] = useState<PostLike | null>(null);

  const { fetchApi, isLoading } = useApi<
    LikePostParams,
    LikePostResponse,
    LikePostError
  >(
    'LikePost',
    () => ({
      method: 'POST',
      url: `/api/posts/${postId}/likes`,
    }),
    {
      onSuccess: ({ data }) => {
        setNewLike(data);
      },
    },
  );

  useEffect(() => {
    if (newLike) {
      const postIndex = postListData.findIndex(data => data.id === postId);

      const postLikeData = [...postListData[postIndex].postLikes, newLike];

      const postData = postListData[postIndex];

      const newPostListData = [...postListData];

      newPostListData[postIndex] = {
        ...postData,
        postLikes: postLikeData,
      };

      setPostListData(newPostListData);
    }
  }, [newLike]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useLikePost;
