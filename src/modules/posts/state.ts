import { atom, atomFamily } from 'recoil';
import { Post, PostComment } from './type';

export const postListAtom = atom<Post[]>({
  key: 'postList',
  default: [],
});

export const getPostListParams = atom({
  key: 'getPostList',
  default: {
    alumClassId: 'all',
    gradeId: 'all',
    page: 1,
    limit: 4, // keep low to test load more
  },
});

export const postCommentListDataAtomFamily = atomFamily<PostComment[], string>({
  key: 'postCommentListData',
  default: () => [],
});

export const getPostCommentListParamsAtomFamily = atomFamily({
  key: 'getPostCommentListParams',
  default: () => ({
    page: 1,
    limit: 4, // keep low to test load more
  }),
});
