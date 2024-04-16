import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  articlesTwo: [],
};
const articlesSliceTwo = createSlice({
  name: "articlesTwo",
  initialState,
  reducers: {
    addArticleTwo: (state, action) => {
      state.articlesTwo.push(action.payload);
    },
  },
});

export const { addArticleTwo } = articlesSliceTwo.actions;
export default articlesSliceTwo.reducer;
