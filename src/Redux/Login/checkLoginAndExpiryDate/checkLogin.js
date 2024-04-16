import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../authSlice";
import {
  selectToken,
  selectFullName,
  selectExpiration,
} from "../../reduxSelector";

function CheckLogin(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const token = useSelector(selectToken);
  const name = useSelector(selectFullName);
  const expiration = useSelector(selectExpiration);
  const dispatch = useDispatch();
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
      }
    } else {
      setIsLoggedIn(false);
      dispatch(logoutSuccess());
    }
  }, [token, expiration, name, dispatch]); // Add token and expiration to the dependency array

  // Pass isLoggedIn and fullName as props to the child component
  return props.children({ isLoggedIn, fullName });
}

export default CheckLogin;
