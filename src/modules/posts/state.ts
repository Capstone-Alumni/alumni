import { atom } from 'recoil';

export const postListAtom = atom({
  key: 'postList',
  default: [],
});

export const getPostListParams = atom({
  key: 'getPostList',
  default: {
    page: 1,
    limit: 20,
  },
});
