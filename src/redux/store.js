import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import userReducer from "./slices/userSlice";
import hostelReducer from "./slices/hostelSlice";

const reducer = {
  appState: appReducer,
  userState: userReducer,
  hostelState: hostelReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
