import { Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import EmployeeProtectedRoute from "../routes/EmployeeProtectedRoute";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ApplyLeave from "../pages/ApplyLeave";
import MarkAttendance from "../pages/MarkAttendance";
import MyLeaves from "../pages/MyLeaves";
import Profile from "../pages/Profile";

function EmployeeRoutes(){
    
    return(
        <>
            <Route element = {<ProtectedRoute/>}>
                <Route element = {<EmployeeProtectedRoute/>}>
                    <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
                    <Route path="/apply-leave" element={<ApplyLeave/>}/>
                    <Route path="/my-attendance" element={<MarkAttendance/>}/>
                    <Route path="/my-leaves" element={<MyLeaves/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>

            </Route>
        </>
    )

}

export default EmployeeRoutes