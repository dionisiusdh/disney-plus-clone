import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
