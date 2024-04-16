//login.jsx
import { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { loginSuccess } from "./authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [, setNameofUser] = useState("");
  const [error, setError] = useState("");

  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !userPass) {
      setError("Please enter both username and password.");
      return;
    }
    try {
      setError("");
      const response = await axios.get(
        `http://localhost:3001/customerLogin/${userName}/${userPass}`
      );
      if (response.data && response.data.token) {
        const { name, token } = response.data;
        // Decode the token to get expiration time
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        // Dispatch action to set token and expiration in Redux store
        const expirationDate = new Date(expirationTime);
        console.log(expirationDate);
        dispatch(loginSuccess({ token, name, expiration: expirationTime }));
        setNameofUser(name);
      } else {
        setNameofUser("");
        setError("User or password not correct");
      }
    } catch (error) {
      console.error(
        "Error while fetching data on the client side:",
        error.message
      );
      setError("Error User or password not correct");
    }
  };
  return (
    <>
      <div>
        <h3>Login Page</h3>
        {/**        <Link to='/register'> Register By Free</Link> */}
      </div>
      <div>{/** <Link to='/'> MainPage</Link> */}</div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='userName'>UserName: </label>
          <input
            type='text'
            id='userName'
            name='userName'
            placeholder='your userName'
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            autoComplete='useName'
          />
        </div>
        <div>
          <label htmlFor='userPassword'>Password: </label>
          <input
            type='password'
            id='userPassword'
            name='userPassword'
            placeholder='your pass code'
            value={userPass}
            onChange={(e) => {
              setUserPass(e.target.value);
            }}
            autoComplete='userPassword'
          />
        </div>
        <div>
          <button type='submit' disabled={false}>
            LogIn
          </button>
        </div>
      </form>

      <br />

      <br />
      <br />
      <br />
      {/**<div>{nameofUser && <p>Welcome: {nameofUser}</p>}</div> */}
      <div> {error && <p>{error}</p>} </div>
    </>
  );
}
