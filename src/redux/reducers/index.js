import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";

// Define persist config for the `users` reducer
const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["user"], // Persist only the `user` object inside `users`
};

// Combine reducers with individual persist configs
const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, userReducer), // Persisted
});

// Create a persisted reducer
const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export default persistedReducer;
