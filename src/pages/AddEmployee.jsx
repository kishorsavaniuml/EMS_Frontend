import Loader from "../components/Loader";
import Sidebar from "../components/sidebar/Sidebar";
import Error from "../components/Error";
import Header from "../components/Header";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function AddEmployee() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "employee";

    const navigate = useNavigate();
  

  const clickHandler = async () => {
    try {
      setLoader(true);
      const response = await axios.post(`${SERVER_URL}/api/users`, {
        firstname,
        lastname,
        email,
        password,
        role
      } , {withCredentials:true});

      console.log(response);

      {alert("employee added succesfully")}
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      

      navigate("/admin-dashboard");
      
    } catch (err) {
      console.log(err);
      return setError(err.response?.data?.message);
    }finally{
      setLoader(false)
    }
  };



  

  return (
    
    <div className="w-screen h-screen overflow-hidden bg-gray-50">
      {error&&<Error error ={error} setError ={setError}/>}
      {loader&&<Loader/>}
      {(<div className="flex">
        <Sidebar hamburgerIcon={hamburgerIcon} />

        <div className="flex flex-col w-full max-w-full">
          <Header
            hamburgerIcon={hamburgerIcon}
            setHamburgerIcon={setHamburgerIcon}
            
          />

          <div className="main px-5 py-5 flex gap-5 flex-col mt-1">
            <h2 className="font-semibold text-xl text-gray-900 py-5">
              Add Employee
            </h2>

            <div className="bg-white p-3 rounded w-4/5 max-w-4/5 mx-auto">
              
                <div>
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5 gap-1">
                        <label
                          htmlFor="fisrtname"
                          className=" text-sm font-semibold"
                        >
                          First Name
                        </label>
                        <input
                          onChange={(e) => setFirstname(e.target.value)}
                          id="fisrtname"
                          type="text"
                          value={firstname}
                          placeholder="First Name"
                          className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                        />
                      </div>
                      <div className="flex flex-col w-2/5 gap-1">
                        <label
                          htmlFor="lastname"
                          className=" text-sm font-semibold"
                        >
                          Last Name
                        </label>
                        <input
                          onChange={(e) => setLastname(e.target.value)}
                          id="lastname"
                          type="text"
                          value={lastname}
                          placeholder="Last Name"
                          className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5 gap-1">
                        <label
                          htmlFor="email"
                          className=" text-sm font-semibold"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          type="email"
                          value={email}
                          placeholder="email"
                          className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                        />
                      </div>
                      <div className="flex flex-col w-2/5 gap-1">
                        <label
                          htmlFor="password"
                          className=" text-sm font-semibold"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          type="password"
                          value={password}
                          placeholder="password"
                          className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col w-2/5 gap-1">
                        <label
                          htmlFor="role"
                          className=" text-sm font-semibold"
                        >
                          Role
                        </label>
                        <input
                          id="role"
                          type="text"
                          defaultValue={role}
                          placeholder="First Name"
                          className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      value={"Add Employee"}
                      clickHandler={clickHandler}
                    />
                  </div>
                </div>
             
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default AddEmployee;
