import { configureStore } from "@reduxjs/toolkit"; 
import {combineReducers} from 'redux';
import { cryptoApi } from "../services/cryptoAPI";
import { cryptoNewsApi } from "../services/cryptoNews";
import { currencySlice } from "../features/currency/currencySlice";
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const reducers = combineReducers({
    currency: currencySlice.reducer,
  });

const persistConfig = {
    key: 'persist',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer:{
        currency: persistedReducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        devTools: process.env.NODE_ENV !== 'production',
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
        }).concat(cryptoApi.middleware, cryptoNewsApi.middleware),
    });


setupListeners(store.dispatch);