import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";


const clientConfig = {
  url: "http://localhost:8080/",
  realm: "ChatBox",
  clientId: "web-front_end",
};

// Create the Keycloak instance
const client = new Keycloak(clientConfig);

// Custom hook for authentication
const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    client
      .init({ onLoad: "login-required" })
      .then((res) => {
        setLogin(res);
        if (client.token !== undefined) {
          setToken(client.token);
        }
      })
      .catch((error) => {
        console.error("Error during init:", error);
      });
  }, []);

  const logout = async () => {
    try {
      await client.logout();
      setToken(null);
      setLogin(false); // Update login state
      // Optionally, redirect to a logout landing page or login page
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle logout errors gracefully
    }
  };


  return [isLogin, token,logout];
};

export default useAuth;
