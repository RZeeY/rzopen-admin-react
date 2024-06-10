import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfo/index.js';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
