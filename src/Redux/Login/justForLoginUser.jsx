//import React from "react";

import CheckLogin from "./checkLoginAndExpiryDate/checkLogin";
import Logout from "./logout";

function JustForLoginUser() {
  return (
    <div>
      <CheckLogin>
        {({ isLoggedIn, fullName }) => (
          <div>
            <Logout />
            {isLoggedIn ? (
              <p>Welcome, {fullName}!</p>
            ) : (
              <p>Please log in to continue.</p>
            )}
          </div>
        )}
      </CheckLogin>
    </div>
  );
}

export default JustForLoginUser;
