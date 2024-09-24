import { configureStore } from '@reduxjs/toolkit';

import Auth from './slice/Auth';
import Script from './slice/Script';

const Store = configureStore({
  reducer: {
    auth: Auth,
    script: Script,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
