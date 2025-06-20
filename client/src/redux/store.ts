import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import {cartReducer} from '@/redux/reducers/cartReducer'

export const store = configureStore({
  reducer: {
     authReducer,
     cartReducer
  },
});

export default store;