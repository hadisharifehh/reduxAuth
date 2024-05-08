import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.data = action.payload; // use it like this cause when the api updated two new item it will cansel the previous one and update on new one
    },
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;
