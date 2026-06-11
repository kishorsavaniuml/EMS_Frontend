import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Logout";

function LogoutRoute () {

    return(
        <>
            <Route element={<ProtectedRoute/>}>
                <Route path="/logout" element={<Login/>}/>
            </Route>
        </>
    )
}

export default LogoutRoute;