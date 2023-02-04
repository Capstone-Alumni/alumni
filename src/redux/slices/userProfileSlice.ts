// Need to use the React-specific entry point to allow generating React hooks
import { Education, Career, Information } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserInformation } from '@share/type';
import { RootState } from 'src/redux/store';

// Define a service using a base URL and expected endpoints
export const userProfileApi = createApi({
  reducerPath: 'userProfile',
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  tagTypes: ['Infomation', 'Careers', 'Educations'],
  endpoints: (builder) => ({

    // Infomation

    getUserInformation: builder.query<any, any>({
      query: (id: string) => `api/users/${id}/information`,
      providesTags: ['Infomation'],
    }),
    updateUserInformation: builder.mutation<any, Partial<Information> & Pick<Information, 'userId'>>({
      query: ({ userId, ...data }) => ({
        url: `api/users/${userId}/information`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Infomation'],
    }),

    // Careers

    getUserCareers: builder.query<any, any>({
      query: (id: any) => `api/users/${id}/career`,
      providesTags: ['Careers'],
    }),

    updateUserCareers: builder.mutation<any, any>({
      query: ({ userId, data }) => ({
        url: `api/users/${userId}/career`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Careers'],
    }),

    // Educations

    getUserEducations: builder.query<any, any>({
      query: (id: any) => `api/users/${id}/education`,
      providesTags: ['Educations'],
    }),

    updateUserEducations: builder.mutation<any, any>({
      query: ({ userId, data }) => ({
        url: `api/users/${userId}/education`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ['Educations'],
    }),

  }),
})

// Selectors
export const currentUserState = (state: RootState) => userProfileApi.endpoints.getUserInformation.select(state);


// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserCareersQuery, useGetUserEducationsQuery, useGetUserInformationQuery, useUpdateUserInformationMutation, useUpdateUserCareersMutation, useUpdateUserEducationsMutation } = userProfileApi