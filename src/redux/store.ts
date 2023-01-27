import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import currentTenantReducer from './slices/currentTenantSlice';
import { currentUserApi } from './slices/currentUserSlice'
import { userProfileApi } from './slices/userProfileSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentTenant: currentTenantReducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currentUserApi.middleware).concat(userProfileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
