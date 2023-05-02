import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { PostFormValues } from '../components/PostForm';
import { postListAtom } from '../state';
import { Post } from '../type';

type UpdatePostParams = PostFormValues & { postId: string };

type UpdatePostResponse = {
  data: Post;
};

type UpdatePostError = AxiosError;

const useUpdatePost = () => {
  const [postList, setPostList] = useRecoilState(postListAtom);
  const [newPost, setNewPost] = useState<null | Post>(null);

  const { fetchApi, isLoading } = useApi<
    UpdatePostParams,
    UpdatePostResponse,
    UpdatePostError
  >(
    'UpdatePost',
    ({ postId, ...data }) => ({
      method: 'PUT',
      url: `/api/posts/${postId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhập bài đăng thất bại');
      },
      onSuccess: ({ data }) => {
        toast.success('Cập nhập bài đăng thành công');
        setNewPost(data);
      },
    },
  );

  useEffect(() => {
    if (newPost) {
      const postIndex = postList.findIndex(data => data.id === newPost.id);
      const postData = postList[postIndex];
      const newPostListData = [...postList];

      newPostListData[postIndex] = {
        ...postData,
        ...newPost,
      };

      setPostList(newPostListData);
    }
  }, [newPost]);

  return {
    isLoading,
    fetchApi,
  };
};

export default useUpdatePost;
