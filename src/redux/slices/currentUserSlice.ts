import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: any = {
  isLoading: false,
  error: false,
  data: {}
};

const slice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCurrentUser(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { setCurrentUser } = slice.actions;

// ----------------------------------------------------------------------

export async function getCurrentUserInfo(id: string) {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get(`/api/users/${id}/information`);
    dispatch(slice.actions.setCurrentUser(response.data));
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    console.log(error);
  }
}