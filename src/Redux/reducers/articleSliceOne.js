import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  articlesOne: [],
};
const articlesSliceOne = createSlice({
  name: "articlesOne",
  initialState,
  reducers: {
    addArticleOne: (state, action) => {
      state.articlesOne = [...state.articlesOne, action.payload];
    },
  },
});
export const { addArticleOne } = articlesSliceOne.actions;
export default articlesSliceOne.reducer;
//state.articlesOne.push(action.payload); update array with new items and store it all (not recommended )
// state.articlesOne = action.payload; // add one single array item and when you add a new one it cancel the previous one
//   state.articlesOne = [...state.articlesOne, action.payload]; //  update array with new array of item and store it all (recommended )
