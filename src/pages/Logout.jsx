import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

function Logout() {
  const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar hamburgerIcon={hamburgerIcon} />

        <div className="w-full flex flex-col h-full">
          <Header
            hamburgerIcon={hamburgerIcon}
            setHamburgerIcon={setHamburgerIcon}
          />

          <div className="bg-gray-50  flex items-center justify-center mt-1 flex-1 min-h-0">
            <div className="bg-white w-[450px] rounded-2xl border border-gray-200 shadow-sm p-10">
              
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 h-10 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h10.5m0 0l-3-3m3 3l-3 3"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-center mt-6">
                Logout
              </h1>

              <p className="text-gray-500 text-center mt-3">
                Are you sure you want to logout?
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={logoutHandler}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
                >
                  Yes, Logout
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;