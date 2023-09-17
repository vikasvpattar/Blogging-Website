import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setuserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setuserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
