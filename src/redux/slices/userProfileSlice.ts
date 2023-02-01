// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Career, UserInformation } from '@share/type';
import { RootState } from 'src/redux/store';

// Define a service using a base URL and expected endpoints
export const userProfileApi = createApi({
  reducerPath: 'userProfile',
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  tagTypes: ['Infomation', 'Careers'],
  endpoints: (builder) => ({
    getUserInformation: builder.query<any, any>({
      query: (id: string) => `api/users/${id}/information`,
      providesTags: ['Infomation'],
    }),
    updateUserInformation: builder.mutation<any, Partial<UserInformation> & Pick<UserInformation, 'userId'>>({
      query: ({ userId, ...data }) => ({
        url: `api/users/${userId}/information`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Infomation'],
    }),

    //

    getUserCareers: builder.query<any, any>({
      query: (id: any) => `api/users/${id}/career`,
      providesTags: ['Careers'],
    }),

    updateUserCareers: builder.mutation<any, Partial<Career> & Pick<Career, 'userId'>>({
      query: ({ userId, ...data }) => ({
        url: `api/users/${userId}/career`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Careers'],
    }),

    //
    getUserEducation: builder.query<any, any>({
      query: (id: any) => `api/users/${id}/education`,
    }),

  }),
})

// Selectors
export const currentUserState = (state: RootState) => userProfileApi.endpoints.getUserInformation.select(state);


// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserCareersQuery, useGetUserEducationQuery, useGetUserInformationQuery, useUpdateUserInformationMutation, useUpdateUserCareersMutation } = userProfileApi