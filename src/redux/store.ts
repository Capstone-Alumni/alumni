import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import currentUserReducer from './slices/currentUserSlice';
// import currentTenantReducer from './slices/currentTenantSlice';
import { userProfileApi } from './slices/userProfileSlice';
import { searchProfilesApi } from './slices/searchProfiles';
import { newsSliceApi } from './slices/newsSlice';
import { newsCommentSliceApi } from './slices/newsCommentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // currentTenant: currentTenantReducer,
    currentUser: currentUserReducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [newsSliceApi.reducerPath]: newsSliceApi.reducer,
    [newsCommentSliceApi.reducerPath]: newsCommentSliceApi.reducer,
    [searchProfilesApi.reducerPath]: searchProfilesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // prettier-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userProfileApi.middleware)
      .concat(newsSliceApi.middleware)
      .concat(newsCommentSliceApi.middleware)
      .concat(searchProfilesApi.middleware),
});

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { dispatch };
