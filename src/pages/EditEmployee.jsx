import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
// import Sidebar from "../components/sidebar/Sidebar";
// import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router-dom";
import AdminLayOut from "../components/AdminLayOut";

function EditEmployee() {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  // const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const submitClickHandler = async () => {
    setError("");
    setLoader(true);

    try {
      await axios.put(
        `${SERVER_URL}/api/users/${id}`,
        { email, firstname: firstName, lastname: lastName, role },
        { withCredentials: true },
      );

      alert("employee edited successfully");
      navigate("/employees");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const cancleClickHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    const getEmployee = async () => {
      try {
        setError("");
        setLoader(true);

        const employee = await axios.get(`${SERVER_URL}/api/users/${id}`, {
          withCredentials: true,
        });

        console.log(employee);

        setFirstName(employee.data.data.firstname);
        setLastName(employee.data.data.lastname);
        setEmail(employee.data.data.email);
        setRole(employee.data.data.role);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message);
      } finally {
        setLoader(false);
      }
    };
    getEmployee();
  }, [id]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {error && <Error error={error} setError={setError} />}
      <AdminLayOut>
        <div className="h-full flex-1">
          {loader && <Loader />}
          <div className="bg-gray-50 p-5 flex flex-col gap-5 mt-1">
            <h1 className="text-xl font-semibold">Edit Employee</h1>
            <div className="mx-10 bg-white p-5 border border-gray-100 shadow rounded-xl shadow-gray-200 flex flex-col justify-center items-center gap-20">
              <div className="flex flex-col gap-8 w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col w-2/5 gap-1">
                    <label
                      htmlFor="fisrtname"
                      className=" text-sm font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      id="fisrtname"
                      type="text"
                      value={firstName}
                      placeholder="First Name"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 capitalize"
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
                      onChange={(e) => setLastName(e.target.value)}
                      id="lastname"
                      type="text"
                      value={lastName}
                      placeholder="Last Name"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 capitalize"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-2/5 gap-1">
                    <label htmlFor="email" className=" text-sm font-semibold">
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
                    <label htmlFor="role" className=" text-sm font-semibold">
                      Role
                    </label>
                    <input
                      onChange={(e) => setRole(e.target.value)}
                      id="role"
                      type="text"
                      value={role}
                      placeholder="First Name"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-1/3 gap-2">
                <Button value={"Submit"} clickHandler={submitClickHandler} />
                <Button value={"Cancel"} clickHandler={cancleClickHandler} />
              </div>
            </div>
          </div>
        </div>
      </AdminLayOut>

      {/* { (
        <div className="flex">
          <Sidebar hamburgerIcon={hamburgerIcon} />
          <div className="w-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />
            <div className="bg-gray-50 p-5 h-[calc(100vh-64px)] flex flex-col gap-5 mt-1">
              <h1 className="text-xl font-semibold">Edit Employee</h1>
              <div className="mx-10 bg-white p-5 border border-gray-100 shadow rounded-xl shadow-gray-200 flex flex-col justify-center items-center gap-20">
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex justify-between">
                    <div className="flex flex-col w-2/5 gap-1">
                      <label
                        htmlFor="fisrtname"
                        className=" text-sm font-semibold"
                      >
                        First Name
                      </label>
                      <input
                        onChange={(e) => setFirstName(e.target.value)}
                        id="fisrtname"
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 capitalize"
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
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastname"
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 capitalize"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col w-2/5 gap-1">
                      <label htmlFor="email" className=" text-sm font-semibold">
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
                      <label htmlFor="role" className=" text-sm font-semibold">
                        Role
                      </label>
                      <input
                        onChange={(e) => setRole(e.target.value)}
                        id="role"
                        type="text"
                        value={role}
                        placeholder="First Name"
                        className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/3 gap-2">
                  <Button value={"Submit"} clickHandler={submitClickHandler} />
                  <Button value={"Cancel"} clickHandler={cancleClickHandler}/>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default EditEmployee;
