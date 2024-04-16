import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  articlesOne: [],
};
const articlesSliceOne = createSlice({
  name: "articlesOne",
  initialState,
  reducers: {
    addArticleOne: (state, action) => {
      state.articlesOne.push(action.payload);
    },
  },
});
export const { addArticleOne } = articlesSliceOne.actions;
export default articlesSliceOne.reducer;
