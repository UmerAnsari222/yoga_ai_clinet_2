// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/users/`,
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: user => {
        return {
          url: 'register',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    registerGoogle: builder.mutation({
      query: user => {
        return {
          url: 'google',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    registerFacebook: builder.mutation({
      query: user => {
        return {
          url: 'facebook',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: user => {
        return {
          url: 'login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    loginProvider: builder.mutation({
      query: user => {
        return {
          url: 'provider-login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    loggedInUser: builder.query({
      query: (token: string) => ({
        url: 'me',
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
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoggedInUserQuery,
  useRegisterGoogleMutation,
  useRegisterFacebookMutation,
  useLoginProviderMutation,
} = authApi;
