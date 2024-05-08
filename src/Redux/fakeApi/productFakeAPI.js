import axios from "axios";
import { fetchProducts } from "./productSlice";

export function getProducts() {
  return async function getProductsThunk(dispatch) {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(fetchProducts(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
}
//note : getProducts() is a function that returns another function, which is the thunk function getProductsThunk(dispatch).
/**
 * When you call dispatch(getProducts()), Redux recognizes that getProducts is a
 *  thunk action creator. Instead of immediately dispatching
 * an action object like it would with a regular action creator,
 * Redux calls the thunk function getProductsThunk(dispatch).
 *
 * The thunk function getProductsThunk(dispatch) receives dispatch as an argument.
 *  This allows you to dispatch actions from within the thunk function.
 */
