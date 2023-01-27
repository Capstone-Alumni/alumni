// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'src/redux/store';

// Define a service using a base URL and expected endpoints
export const currentUserApi = createApi({
  reducerPath: 'currentUser',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUserInformation: builder.query<any, any>({
        query: (id: any) => `api/users/${id}/information`,
      }),
  }),
})

// Selectors
export const currentUserState = (state: RootState) => currentUserApi.endpoints.getUserInformation.select(state);


// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserInformationQuery } = currentUserApi