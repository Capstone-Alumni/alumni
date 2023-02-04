import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import currentTenantReducer from './slices/currentTenantSlice';
import { newsSliceApi } from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentTenant: currentTenantReducer,
    [newsSliceApi.reducerPath]: newsSliceApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(newsSliceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
