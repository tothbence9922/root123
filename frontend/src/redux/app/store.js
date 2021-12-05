import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import headerSliceReducer from 'redux/slices/HeaderSlice'

const nonPersistedReducers = combineReducers({
    headerSliceReducer
})

const persistConfig = {
    key: 'root',
    storage
};
const persistedReducers = persistReducer(persistConfig, nonPersistedReducers); // Persisted

const combinedReducers = combineReducers({ persistedReducers }) // The "final" combined reducer, containing all our reducers

const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;