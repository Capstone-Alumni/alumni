// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface User {
//   items: any
// }
interface ListResponse<T> {
  itemPerPage: number;
  totalItems: number;
  data: any;
}

// Define a service using a base URL and expected endpoints
export const searchProfilesApi = createApi({
  reducerPath: 'searchProfiles',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Search'],
  endpoints: builder => ({
    // Infomation

    getUsersProfile: builder.query<
      ListResponse<any>,
      { name: any; page: number; limit: number }
    >({
      query: ({ name = '', page = 1, limit = 1 }) => ({
        url: 'api/users/search',
        method: 'GET',
        params: {
          name,
          page,
          limit,
        },
      }),
      providesTags: ['Search'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersProfileQuery, reducerPath } = searchProfilesApi;
