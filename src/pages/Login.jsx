import { MdGroups } from "react-icons/md";
import CoWorkers from "../assets/CoWorkers.png";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RoleContext from "../context/RoleContext";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Login() {
  const { setRole} = useContext(RoleContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setError("");

      const response = await axios.post(
        SERVER_URL + "/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      setEmail("");
      setPassword("");

      const user = response.data.user;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      setRole(user.role)
      user.role == "admin"
        ? navigate("/admin-dashboard")
        : navigate("/employee-dashboard");

      localStorage.setItem("token", response.data.token);


    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full max-w-2xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-400 shadow-gray-300 mx-10 sm:m-0">
        <div className="sm:w-1/2 w-full flex flex-col gap-8 px-8 py-5 ">
          <div className="flex flex-col justify-center items-center gap-2">
            <MdGroups className="text-5xl text-blue-600" />
            <p className=" font-semibold text-lg">Employee Management System</p>
            <p className=" text-gray-500 text-sm">Sign in to your acoount</p>
          </div>
          <div className=" flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-900"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="px-2 py-1 border rounded border-gray-200 focus:outline-gray-400 placeholder:text-sm "
              ></input>
            </div>
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-900"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="px-2 py-1 border rounded border-gray-200 focus:outline-gray-400 placeholder:text-sm "
              ></input>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className=" mt-6 w-full bg-blue-600 rounded-xl px-2 py-1 text-white"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className=" text-xs text-gray-400 text-center">
            @2026 EMS All rights reserved
          </p>
        </div>
        <div className="bg-blue-100 w-1/2 sm:block hidden object-cover">
          <img src={CoWorkers} alt="Coworkers" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default Login;
