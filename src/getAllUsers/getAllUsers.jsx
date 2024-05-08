import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../Redux/reduxSelector";
import { jwtDecode } from "jwt-decode";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(selectToken);
  const [userRole, setUserRole] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [userMessage, seUserMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      setUsers("");
      setUserRole("");
      setUserPermissions("");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3002/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
          setError(error);
          seUserMessage("authentication expired try to login");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (
        decodedToken &&
        decodedToken.user &&
        decodedToken.user.permissions &&
        decodedToken.user.roles
      ) {
        setUserPermissions(decodedToken.user.permissions);
        setUserRole(decodedToken.user.roles);
      }
    }
  }, [token]);

  return (
    <div>
      {isLoading && <p>Loading users...</p>}
      {error && (
        <p>
          Error: {error.message} <br /> <h3>{userMessage}</h3>
        </p>
      )}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
      {userPermissions.includes("write") && <button>Add User</button>}
      {userPermissions.includes("delete") && <button>Delete User</button>}
      userRole from server side is : {userRole}
    </div>
  );
}

export default UsersList;
