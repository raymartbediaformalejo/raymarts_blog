import { configureStore } from "@reduxjs/toolkit";
import topicSlice from "./topic/topic-slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import postSlice from "./post/post-slice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfiguration = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["topic"],
};

const reducer = combineReducers({
  topic: topicSlice.reducer,
  post: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
