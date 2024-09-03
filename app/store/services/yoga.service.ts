// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

// Define a service using a base URL and expected endpoints
export const yogaSessionApi = createApi({
  reducerPath: 'yogaSessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/yoga/`,
  }),
  endpoints: builder => ({
    getAllYogaSessions: builder.query({
      query: (token: string) => ({
        url: 'all',
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSingleYogaSessionById: builder.query({
      query: ({token, id}) => ({
        url: `${id}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllYogaSessionsQuery, useGetSingleYogaSessionByIdQuery} =
  yogaSessionApi;
