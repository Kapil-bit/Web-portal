import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationSlice from "../slices/locationSlice";

const rootReducer = combineReducers({
    location: locationSlice
})


export const store = configureStore({
  reducer: rootReducer,
  mmiddleware: getDefaultMiddleware => 
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat([])
});
