import { createContext, useContext, useEffect, useState } from "react";
import config from "./config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/protected`, {
          method: "GET",
          credentials: "include", // Sends cookie
        });

        if (!response.ok) throw new Error("Not authenticated");

        const data = await response.json();

        setUser(
          {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email
          }
        ); // Store user email
      } catch (err) {
        setUser(null); // Not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
