import { useState, useEffect, useRef } from "react";
import Keycloak, { KeycloakInstance } from "keycloak-js";

interface ClientConfig {
  url: string;
  realm: string;
  clientId: string;
}

const clientConfig: ClientConfig = {
  url: process.env.VITE_KEYCLOAK_URL || "",
  realm: process.env.VITE_KEYCLOAK_REALM || "",
  clientId: process.env.VITE_KEYCLOAK_CLIENT || "",
};

const client: KeycloakInstance = new Keycloak(clientConfig);

const useAuth = (): [boolean, string | null] => {
  const isRun = useRef(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        if (client.token) {
          setToken(client.token);
        }
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;