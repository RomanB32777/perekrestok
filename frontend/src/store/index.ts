import createSagaMiddleware from "redux-saga";
// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
import { rootWatcher } from "../saga";
import { rootReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();
// const composedEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = configureStore({
  reducer: rootReducer,
  // enhancers: [composedEnhancers],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootWatcher);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
