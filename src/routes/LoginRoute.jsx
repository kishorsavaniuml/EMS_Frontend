import { Route } from "react-router-dom"
import Login from "../pages/Login";

function LoginRoute () {
    return (
        <Route path="/" element={<Login/>}/>
    )
     
}
export default LoginRoute
