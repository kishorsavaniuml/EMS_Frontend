import { useState } from "react";
import RoleContext from "./RoleContext";

const RoleContextProvider = ({ children }) => {
  const [role, setRole] = useState(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || "";
  });
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;
