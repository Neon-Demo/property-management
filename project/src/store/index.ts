import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import formReducer from './slices/formSlice';
import reportReducer from './slices/reportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    forms: formReducer,
    reports: reportReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;