import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const token = localStorage.getItem("CC_Token");

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/checklogin", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [token]); // Add token as a dependency to the useEffect hook

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/logout", {}, {
        headers: {
          "Authorization": `Bearer ${token}` // Send the token in the request header
        }
      });
      if (response.data.message === "Logout successful") {
        setIsLoggedIn(false);
        history.push('/login'); // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClick = () => {
    if (isLoggedIn) {
      handleLogout(); // Automatically run handleLogout if isLoggedIn is true
    } else {
      // Optionally, you can navigate to the login page here
      history.push('/login');
    }
  };

  return (
    <button onClick={handleClick}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

export default LogoutButton;
