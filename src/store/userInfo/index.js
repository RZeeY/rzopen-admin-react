import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {},
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: state => {
      state.value = {};
    },
  },
});

export const { set, remove } = userInfoSlice.actions;

export default userInfoSlice.reducer;
