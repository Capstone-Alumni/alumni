// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const searchProfilesApi = createApi({
  reducerPath: 'searchProfiles',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    // Infomation

    getUsersProfile: builder.query<any, any>({
      query: (name: string) => ({
        url: `api/users/search`,
        method: 'GET',
        params: {
          name,
        },
      }),
      providesTags: ['Search'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersProfileQuery } = searchProfilesApi;
