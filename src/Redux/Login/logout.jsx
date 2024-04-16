//logout.jsx
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./authSlice";

function Logout() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(logoutSuccess());
        }}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
