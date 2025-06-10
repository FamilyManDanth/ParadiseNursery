import { configureStore } from "@reduxjs/toolkit";
import plantReducer from "./components/slices/plantSlice";

export default configureStore({
  reducer: {
    plant: plantReducer,
  },
});
