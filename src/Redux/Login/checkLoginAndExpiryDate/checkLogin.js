import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess, updateAccessToken } from "../authSlice";
import {
  selectToken,
  selectFullName,
  selectExpiration,
  selectRefrToken,
} from "../../reduxSelector";
import axios from "axios";

function CheckLogin(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const token = useSelector(selectToken);
  const refrToken = useSelector(selectRefrToken);
  const name = useSelector(selectFullName);
  const expiration = useSelector(selectExpiration);
  const dispatch = useDispatch();

  const handleTokenRefresh = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:3002/refreshToken", {
        refreshToken: refrToken, // Use refreshToken from Redux store
      });
      if (response.data && response.data.token) {
        const { token } = response.data;

        // Dispatch action to update access token in Redux store
        dispatch(updateAccessToken(token));
      }
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      // Handle token refresh error, e.g., redirect to login page
      // or dispatch logout action to clear user authentication state
      dispatch(logoutSuccess());
    }
  }, [dispatch, refrToken]);

  useEffect(() => {
    if (token && expiration && name) {
      // Decode the token to get expiration time
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now();

      // Check if token is expired
      if (decodedToken.exp * 1000 > currentTime) {
        setIsLoggedIn(true);
        setFullName(name);
      } else {
        setIsLoggedIn(false);
        // Clear expired token and related data from local storage
        handleTokenRefresh(); // Refresh the token
      }
    } else {
      setIsLoggedIn(false);
      dispatch(logoutSuccess());
    }
  }, [token, expiration, name, handleTokenRefresh, dispatch]);

  // Pass isLoggedIn and fullName as props to the child component
  return props.children({ isLoggedIn, fullName });
}

export default CheckLogin;
