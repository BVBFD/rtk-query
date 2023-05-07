import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { apiSlice } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import userRedercer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
  whitelist: ['user'],
  // whitelist 에 persist하고 싶은 slice 값을 넣어서 localStorage에 저장되게 한다.
  // 만약 blacklist, whitelist 정의하지 않으면 default로 자동으로 localStorage에 저장되어 persist 기능을 수행하게 됨.
};

const rootReducer = combineReducers({
  user: userRedercer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
