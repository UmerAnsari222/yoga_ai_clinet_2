// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

// Define a service using a base URL and expected endpoints
export const reminderApi = createApi({
  reducerPath: 'reminderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/reminder/`,
  }),
  endpoints: builder => ({
    createReminder: builder.mutation({
      query: ({data, token}) => {
        return {
          url: 'create',
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // getFavoriteYogaOfUser: builder.query({
    //   query: (token: string) => ({
    //     url: 'all',
    //     method: 'GET',
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useCreateReminderMutation} = reminderApi;
