import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetNewsListDataParams } from '../../modules/news/types';

// ================================== Get news list =====================================

export const newsSliceApi = createApi({
  reducerPath: 'newsSliceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['News'],
  endpoints: builer => ({
    getNewsForSchoolAdmin: builer.query({
      query: ({ params }: { params: GetNewsListDataParams }) => ({
        url: '/api/news',
        params: params,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    getNewsByIdForSchoolAdmin: builer.query({
      query: (newsId: string) => ({
        url: `api/news/${newsId}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    createNews: builer.mutation({
      query: ({ title, content, newsImageUrl, tagsNews }) => ({
        url: 'api/news',
        method: 'POST',
        body: {
          title,
          content,
          newsImageUrl,
          tagsNews,
        },
      }),
      invalidatesTags: ['News'],
    }),
    updateNewsById: builer.mutation({
      query: ({
        newsId,
        title,
        content,
        isPublic,
        newsImageUrl,
        tagsNews,
      }) => ({
        url: `api/news/${newsId}`,
        method: 'PUT',
        body: {
          title,
          content,
          isPublic,
          newsImageUrl,
          tagsNews,
        },
      }),
      invalidatesTags: ['News'],
    }),
    getNewsForPublic: builer.query({
      query: ({ params }: { params: GetNewsListDataParams }) => ({
        url: '/api/news/public',
        params: params,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    getNewsByIdForPublic: builer.query({
      query: (newsId: string) => ({
        url: `/api/news/public/${newsId}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
    deleteNews: builer.mutation({
      query: ({ newsId }) => ({
        url: `/api/news/${newsId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['News'],
    }),
    getTagsNews: builer.query({
      query: () => ({
        url: '/api/news/tags',
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
  }),
});

export const {
  useGetNewsForSchoolAdminQuery,
  useGetNewsByIdForSchoolAdminQuery,
  useUpdateNewsByIdMutation,
  useGetNewsForPublicQuery,
  useGetNewsByIdForPublicQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetTagsNewsQuery,
} = newsSliceApi;
