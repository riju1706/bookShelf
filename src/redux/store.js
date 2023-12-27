import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  authorTitleReducer,
  firebaseOrdersReducer,
  bookDetailsReducer,
  searchReducer,
  userDetailsReducer,
} from "./cartSlice";

export const storage = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    authorTitle: authorTitleReducer,
    user: userDetailsReducer,
    firebaseOrders: firebaseOrdersReducer,
    bookdetails: bookDetailsReducer,
  },
});
