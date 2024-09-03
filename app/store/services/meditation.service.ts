// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

// Define a service using a base URL and expected endpoints
export const meditationApi = createApi({
  reducerPath: 'meditationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/meditation/`,
  }),
  endpoints: builder => ({
    getAllMeditationByLevel: builder.query({
      query: ({token, type}) => ({
        url: `level/${type}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSingleMeditationById: builder.query({
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
export const {
  useGetAllMeditationByLevelQuery,
  useGetSingleMeditationByIdQuery,
} = meditationApi;
