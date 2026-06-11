import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import AdminDashboard from "../pages/AdminDashboard";
import AddEmployee from "../pages/AddEmployee";
import Employees from "../pages/Employees";
import EditEmployee from "../pages/EditEmployee";
import LeaveRequests from "../pages/LeaveRequests";



function AdminRoutes (){
    return (
        <>
            <Route element = {<ProtectedRoute/>}>
                <Route element={<AdminProtectedRoute/>}>
                    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                    <Route path="/add-employee" element={<AddEmployee/>}/>
                     <Route path="/employees" element={<Employees/>}/>
                     <Route path="/edit-employee/:id" element={<EditEmployee/>}/>
                     <Route path="/leave-requests" element={<LeaveRequests/>}/>
                  

                </Route>
            </Route>

        </>
    )
}

export default AdminRoutes;