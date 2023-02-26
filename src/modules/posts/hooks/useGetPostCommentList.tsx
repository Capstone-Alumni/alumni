import { AxiosError } from 'axios';
import { useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import {
  getPostCommentListParamsAtomFamily,
  postCommentListDataAtomFamily,
} from '../state';
import { PostComment } from '../type';

type GetPostCommentListParams = {
  page: number;
  limit: number;
};

type GetPostCommentListResponse = {
  data: {
    items: PostComment[];
    totalItems: number;
  };
};

type GetPostCommentListError = AxiosError;

const useGetPostCommentList = (postId: string) => {
  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const [postCommentListData, setPostCommentListData] = useRecoilState(
    postCommentListDataAtom,
  );
  const getPostCommentListParamsAtom =
    getPostCommentListParamsAtomFamily(postId);
  const [params, setParams] = useRecoilState(getPostCommentListParamsAtom);
  const resetParams = useResetRecoilState(getPostCommentListParamsAtom);

  const isMounted = useRef(false);

  const {
    fetchApi,
    data: apiData,
    isLoading,
  } = useApi<
    GetPostCommentListParams,
    GetPostCommentListResponse,
    GetPostCommentListError
  >(
    `getPostCommentList/${postId}`,
    params => ({
      method: 'GET',
      url: `/api/posts/${postId}/comments`,
      params,
    }),
    {
      onSuccess: ({ data }) => {
        setPostCommentListData(prevState => [...prevState, ...data.items]);
      },
    },
  );

  useEffect(() => {
    return refresh();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      fetchApi(params);
    } else {
      isMounted.current = true;
    }
  }, [params]);

  const loadedAll = useMemo(
    () => apiData?.data.totalItems === postCommentListData.length,
    [apiData, postCommentListData],
  );

  const loadMore = () => {
    setParams(prevParams => ({ ...prevParams, page: prevParams.page + 1 }));
  };

  const refresh = () => {
    setPostCommentListData([]);
    resetParams();
  };

  return {
    postCommentListData,
    getPostCommentList: fetchApi,
    isLoading,
    refresh,
    loadMore,
    loadedAll,
  };
};

export default useGetPostCommentList;
