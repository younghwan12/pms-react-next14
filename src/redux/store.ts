import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appApi from "./appApi";

import { persistReducer, persistStore } from "redux-persist"; //
import storage from "redux-persist/lib/storage";
import errorReducer from "./errorSlice";
import { rtkErrorLogger } from "./middlewares";

const reducers = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    error: errorReducer, // Error Reducer 추가
});

const whiteListReducers = ["user"];

const persistConfig = {
    key: "root", // 저장소에 저장될 키 값
    storage, // 로컬 스토리지 사용
    //whitelist: whiteListReducers,
};

const persistedReducer = persistReducer(persistConfig, reducers); // rootReducer 대신에 combineReducers로 만든 reducers 사용

export const store = configureStore({
    reducer: persistedReducer, // persistReducer로 만든 reducer 사용
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }).concat(appApi.middleware, rtkErrorLogger),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
