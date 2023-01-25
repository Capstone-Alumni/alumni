import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import currentTenantReducer from './slices/currentTenantSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentTenant: currentTenantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
