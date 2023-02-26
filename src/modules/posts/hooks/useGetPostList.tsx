import { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPostListParams, postListAtom } from '../state';
import { Post } from '../type';

type GetPostListParams = {
  page: number;
  limit: number;
};

type GetPostListResponse = {
  data: {
    items: Post[];
  };
};

type GetPostListError = AxiosError;

const useGetPostList = () => {
  const [postList, setPostList] = useRecoilState(postListAtom);
  const [params, setParams] = useRecoilState(getPostListParams);
  const resetParams = useResetRecoilState(getPostListParams);
  const isMounted = useRef(false);

  const { fetchApi, isLoading } = useApi<
    GetPostListParams,
    GetPostListResponse,
    GetPostListError
  >(
    'getPostList',
    params => ({
      method: 'GET',
      url: '/api/posts',
      params,
    }),
    {
      onSuccess: ({ data }) => {
        setPostList(prevState => [...prevState, ...data.items]);
      },
    },
  );

  useEffect(() => {
    if (isMounted.current) {
      fetchApi(params);
    } else {
      isMounted.current = true;
    }
  }, [params]);

  const loadMore = () => {
    setParams(prevParams => ({ ...prevParams, page: prevParams.page + 1 }));
  };

  const refresh = () => {
    setPostList([]);
    resetParams();
  };

  return {
    data: postList,
    getPostList: fetchApi,
    isLoading,
    refresh,
    loadMore,
  };
};

export default useGetPostList;
