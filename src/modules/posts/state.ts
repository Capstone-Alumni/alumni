import { atom } from 'recoil';
import { Post } from './type';

export const postListAtom = atom<Post[]>({
  key: 'postList',
  default: [],
});

export const getPostListParams = atom({
  key: 'getPostList',
  default: {
    page: 1,
    limit: 4, // keep low to test load more
  },
});
