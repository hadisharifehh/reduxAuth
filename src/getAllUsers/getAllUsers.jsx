import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../Redux/reduxSelector";
function UsersList() {
  // Renamed to UsersList for clarity
  const [users, setUsers] = useState([]); // Use a more descriptive name
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any errors
  const token = useSelector(selectToken);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors
      try {
        if (token) {
          const response = await axios.get("http://localhost:3001/user", {
            // Include the JWT token in the Authorization header if applicable
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error); // Store the error for displaying
      } finally {
        setIsLoading(false); // Set loading state to false after completion
      }
    };

    fetchUsers();
  }, [token]); // Empty dependency array for fetching on mount

  return (
    <div>
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error: {error.message}</p>}
      {users.length > 0 && ( // Check for users before rendering
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li> // Assuming key prop on user
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;
