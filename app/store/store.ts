import {configureStore} from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from './services/auth.service';
import authSlice from './slice/auth.slice';
import forgotPasswordSlice from './slice/forgot-password.slice';
import {forgotPasswordApi} from './services/forgot-password.service';
import {yogaSessionApi} from './services/yoga.service';
import {reviewApi} from './services/review.service';
import {favoriteApi} from './services/favorite.service';
import {categoryApi} from './services/category.service';
import {meditationApi} from './services/meditation.service';
import {reminderApi} from './services/reminder.service';
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
    [yogaSessionApi.reducerPath]: yogaSessionApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [meditationApi.reducerPath]: meditationApi.reducer,
    [reminderApi.reducerPath]: reminderApi.reducer,

    authSlice: authSlice,
    forgotPasswordSlice: forgotPasswordSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      forgotPasswordApi.middleware,
      yogaSessionApi.middleware,
      reviewApi.middleware,
      favoriteApi.middleware,
      categoryApi.middleware,
      meditationApi.middleware,
      reminderApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
