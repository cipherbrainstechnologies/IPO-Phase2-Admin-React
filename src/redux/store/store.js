import reducer from "../reducer/reducer";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
