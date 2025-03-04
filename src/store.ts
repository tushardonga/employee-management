import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;