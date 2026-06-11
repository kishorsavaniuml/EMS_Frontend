import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import RoleContext from "../context/RoleContext";

function AdminProtectedRoute() {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const role = user?.role;
      const {role} = useContext(RoleContext);
  console.log("this role from adminprotected routes", role);

  if (role !== "admin") {
    alert("This route is only for admin");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
