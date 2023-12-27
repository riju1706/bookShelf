import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};
const cartSlice = createSlice({
  name: "AddCart",
  initialState: [],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    emptyCartAction(state, action) {
      return [];
    },
    removeOneAction(state, action) {
      return state.filter((i) => {
        return i.id !== action.payload;
      });
    },
  },
});
const searchSlice = createSlice({
  name: "searchAddItem",
  initialState: "random",
  reducers: {
    searchAddItem(state, action) {
      return action.payload;
    },
  },
});
const authorTitleSlice = createSlice({
  name: "authorTitleAction",
  initialState: "title",
  reducers: {
    authorTitleAction(state, action) {
      return action.payload;
    },
  },
});
const userDetails = createSlice({
  name: "userDetails",
  initialState: {},
  reducers: {
    userDetailsAction(state, action) {
      return action.payload;
    },
  },
});
const firebaseOrders = createSlice({
  name: "firebaseOrders",
  initialState: [],
  reducers: {
    firebaseOrdersAction(state, action) {
      return action.payload;
    },
    emptyFirebaseOrdersAction(state, action) {
      return [];
    },
  },
});
const bookDetails = createSlice({
  name: "bookDetails",
  initialState: [],
  reducers: {
    bookDetailsAction(state, action) {
      return action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, emptyCartAction, removeOneAction } = cartSlice.actions;

export const searchReducer = searchSlice.reducer;
export const { searchAddItem } = searchSlice.actions;

export const authorTitleReducer = authorTitleSlice.reducer;
export const { authorTitleAction } = authorTitleSlice.actions;

export const userDetailsReducer = userDetails.reducer;
export const { userDetailsAction } = userDetails.actions;

export const firebaseOrdersReducer = firebaseOrders.reducer;
export const { firebaseOrdersAction, emptyFirebaseOrdersAction } =
  firebaseOrders.actions;

export const bookDetailsReducer = bookDetails.reducer;
export const { bookDetailsAction } = bookDetails.actions;
