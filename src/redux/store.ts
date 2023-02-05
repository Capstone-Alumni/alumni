import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import currentTenantReducer from './slices/currentTenantSlice';
import { userProfileApi } from './slices/userProfileSlice';
import currentUser from './slices/currentUserSlice';
import { newsSliceApi } from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentTenant: currentTenantReducer,
    currentUser,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [newsSliceApi.reducerPath]: newsSliceApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // prettier-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userProfileApi.middleware).concat(newsSliceApi.middleware),
});

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { dispatch };
