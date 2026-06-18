import Error from "../components/Error";
import Loader from "../components/Loader";
// import Header from "../components/Header";
// import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayOut from "../components/AdminLayOut";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
function Profile() {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  // const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoader(true);
        setError("");
        const profile = await axios.get(`${SERVER_URL}/api/users/user`, {
          withCredentials: true,
        });
        console.log(profile);
        setFirstName(profile.data.data.firstname);
        setLastName(profile.data.data.lastname);
        setEmail(profile.data.data.email);
        setRole(profile.data.data.role);
        setImageUrl(profile.data.data.image);
      } catch (err) {
        console.log(err);
        return setError(err.response.data.message || err.message);
      } finally {
        setLoader(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {error && <Error error={error} setError={setError} />}

      <AdminLayOut>
        <div className="h-full flex-1">
          {loader && <Loader />}
          <div className="bg-gray-50 p-5 h-[calc(100vh-64px)] flex flex-col gap-5 mt-1">
            <h1 className="text-xl font-semibold">My Profile</h1>
            <div className="bg-white mx-10 border border-gray-200 flex rounded-2xl py-3 h-8/12 items-center gap-5 ">
              <div className="flex justify-center items-center overflow-hidden object-cover flex-1">
                <img
                  src={imageUrl}
                  alt="User's Image"
                  className="object-cover w-3/5 max-h-full"
                />
              </div>
              <div className="flex flex-2 gap-50">
                <div className="flex flex-col gap-20">
                  <div>
                    <p className="text-sm font-semibold">First Name</p>
                    <p className=" capitalize text-sm text-gray-600 font-semibold py-1">
                      {firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className=" capitalize text-sm text-gray-600 font-semibold py-1">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-20">
                  <div>
                    <p className="text-sm font-semibold">Last Name</p>
                    <p className="text-sm text-gray-600 font-semibold py-1">
                      {lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Role</p>
                    <p className="text-sm text-gray-600 font-semibold py-1">
                      {role}
                    </p>
                  </div>
                </div>
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
              <h1 className="text-xl font-semibold">My Profile</h1>
              <div className="bg-white mx-10 border border-gray-200 flex rounded-2xl py-3 h-8/12 items-center gap-5 ">
                <div className="flex justify-center items-center overflow-hidden object-cover flex-1">
                  <img src={imageUrl} alt="User's Image" className="object-cover w-3/5 max-h-full"/>
                </div>
                <div  className="flex flex-2 gap-50">
                  <div className="flex flex-col gap-20">
                    <div>
                      <p className="text-sm font-semibold">First Name</p>
                      <p className=" capitalize text-sm text-gray-600 font-semibold py-1">{firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className=" capitalize text-sm text-gray-600 font-semibold py-1">{email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-20">
                    <div>
                      <p className="text-sm font-semibold">Last Name</p>
                      <p className="text-sm text-gray-600 font-semibold py-1">{lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Role</p>
                      <p className="text-sm text-gray-600 font-semibold py-1">{role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Profile;
