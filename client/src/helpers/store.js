// https://thoughtbot.com/blog/using-redux-with-react-hooks
// https://redux.js.org/basics/store
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import ReduxPromise from "redux-promise";

import { createLogger } from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();
//
// const persistConfig = {
//   key: "root",
//   storage,
//   timeout: null,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = initialState => {
  const store = createStore(
    // persistedReducer,
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware, ReduxPromise)
  );
  return { store };
};

const initialState = {};
const { store } = configureStore(initialState);

export default store;
