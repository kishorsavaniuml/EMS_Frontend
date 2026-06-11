import { Routes , BrowserRouter } from "react-router-dom";
import LoginRoute from "./LoginRoute";
import AdminRoutes from "./AdminRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import LogoutRoute from "./LogoutRoute";
function AppRoutes (){
    return(
        <BrowserRouter>
            <Routes>
                {LoginRoute()}
                {AdminRoutes()}
                {EmployeeRoutes()}
                {LogoutRoute()}
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;