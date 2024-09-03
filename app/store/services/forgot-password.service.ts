// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

// Define a service using a base URL and expected endpoints
export const forgotPasswordApi = createApi({
  reducerPath: 'forgotPasswordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/forgot-password/`,
  }),
  endpoints: builder => ({
    sendEmail: builder.mutation({
      query: email => {
        return {
          url: 'send-otp',
          method: 'POST',
          body: email,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    verifiedOtp: builder.mutation({
      query: data => {
        return {
          url: 'verify-otp',
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    changePassword: builder.mutation({
      query: data => {
        return {
          url: 'change-password',
          method: 'PATCH',
          body: data,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSendEmailMutation,
  useVerifiedOtpMutation,
  useChangePasswordMutation,
} = forgotPasswordApi;
