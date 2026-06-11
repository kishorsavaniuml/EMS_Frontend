
// import { Navigate } from "react-router-dom";

// function ProtectedRoute ({children}) {


//     const token = localStorage.getItem("token")  ;
//     return token? children : <Navigate to="/" replace/>
// }

// export default ProtectedRoute;


import { Navigate , Outlet } from "react-router-dom";
function ProtectedRoute () {
    const token = localStorage.getItem("token");
    console.log("this is token from protectedRoute " , token)
    return !token? <Navigate to = "/" replace/> : <Outlet/>
    
}

export default ProtectedRoute;   