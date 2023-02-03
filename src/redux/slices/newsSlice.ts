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
    }),
    getNewsByIdForSchoolAdmin: builer.query({
      query: (newsId: string) => ({
        url: `api/news/${newsId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetNewsForSchoolAdminQuery,
  useGetNewsByIdForSchoolAdminQuery,
} = newsSliceApi;
