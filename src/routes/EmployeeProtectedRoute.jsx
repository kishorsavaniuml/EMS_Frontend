// import { Navigate } from "react-router-dom";

// function EmployeeProtectedRoute({ children }) {
//   const role = localStorage.getItem("role");

//   if (role !== "employee") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default EmployeeProtectedRoute;

import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import RoleContext from "../context/RoleContext";


function EmployeeProtectedRoute () {
    const {role} = useContext(RoleContext);

    // const user = JSON.parse(localStorage.getItem("user"))
    // const role = user?.role; 
    
    if(role!=="employee"){
        alert("this routes is only for employee");
        return <Navigate to="/" replace />;
    }
    

    return <Outlet/> 
}

export default EmployeeProtectedRoute;
