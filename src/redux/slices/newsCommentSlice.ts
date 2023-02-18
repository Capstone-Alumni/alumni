import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetListNewComment } from '../../modules/news/types';

// ================================== Get news list =====================================

export const newsCommentSliceApi = createApi({
  reducerPath: 'newsCommentSliceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/news',
  }),
  tagTypes: ['NewsComment'],
  endpoints: builer => ({
    getListNewsComment: builer.query({
      query: ({
        newsId,
        params,
      }: {
        newsId: string;
        params: GetListNewComment;
      }) => ({
        url: `/${newsId}/comments`,
        params: params,
        method: 'GET',
      }),
      providesTags: ['NewsComment'],
    }),
    createNewsComment: builer.mutation({
      query: ({ newsId, commentContent }) => ({
        url: `/${newsId}/comments`,
        method: 'POST',
        body: {
          commentContent,
        },
      }),
      invalidatesTags: ['NewsComment'],
    }),
    updateNewsComment: builer.mutation({
      query: ({ newsId, commentId, commentContent }) => ({
        url: `/${newsId}/comments/${commentId}`,
        method: 'PUT',
        body: {
          commentContent,
        },
      }),
      invalidatesTags: ['NewsComment'],
    }),
    deleteNewsComment: builer.mutation({
      query: ({ newsId, commentId }) => ({
        url: `/${newsId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NewsComment'],
    }),
  }),
});

export const {
  useGetListNewsCommentQuery,
  useCreateNewsCommentMutation,
  useUpdateNewsCommentMutation,
  useDeleteNewsCommentMutation,
} = newsCommentSliceApi;
