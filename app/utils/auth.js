import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // Store auth user object
  const [user, setUser] = useState(null);

  const login = (user) => {
    localStorage.setItem("sc:CurrentUser", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    if (localStorage.getItem("sc:CurrentUser")) {
      localStorage.removeItem("sc:CurrentUser");
      setUser(null);
    }
  };

  useEffect(() => {
    // Subscribe to user on mount
    const localUser = localStorage.getItem("sc:CurrentUser");
    if (localUser && localUser !== JSON.stringify(user)) {
      setUser(JSON.parse(localUser));
    }
  }, [user]);

  return {
    user,
    logout,
    login,
  };
}
