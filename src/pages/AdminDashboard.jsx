import { useEffect, useState } from "react";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
import adminCardsData from "../data/adminCardsData";
import AdminDashboardCard from "../components/AdminDashboardCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves : 0,
    recentLeaves: [],

  });
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [hamburgerIcon, setHamburgerIcon] = useState(true);


  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      try {
          const adminDashboardData = await axios.get(`${SERVER_URL}/api/admin-dashboard`,{withCredentials:true});

                

          setDashboardData ((prev) => ({...prev , ...adminDashboardData.data.data}))
      } catch (err) {
        console.error("fail to load data", err);
        setError(err.response?.data?.message || "fail to load data");
      } finally {
        setLoader(false);
      }
    };

    fetchAdminDashboardData();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden ">
      {loader && <Loader/>}

      {error && <Error error={error} setError = {setError}/>}

      { (
        <div className="flex flex-col h-full">
          <Sidebar hamburgerIcon={hamburgerIcon} />

          <div className="flex flex-col w-full max-w-full h-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />

            <div className="main px-4 py-3 flex gap-3 flex-col bg-gray-50 mt-1 h-full">
              <h2 className="font-semibold text-gray-900 py-3">
                Dashboard
              </h2>

              <div className="cards flex justify-between gap-5 ">
                {adminCardsData.map((card, index) => (
                  <AdminDashboardCard
                    key={index}
                    adminCardsData={card}
                    dashboardData={dashboardData}
                  />
                ))}
              </div>
                              <h2 className=" font-semibold py-3">Recent Leaves</h2>
              <div className="shadow shadow-gray-300 flex flex-col px-5 py-3 gap-2.5 bg-white rounded-xl">

                <div>
                  {dashboardData["recentLeaves"].length == 0 ? (
                    "No Leaves to Show"
                  ) : (
                    <table>
                      <thead className="text-gray-800 text-sm">
                        <tr className="border-b border-gray-300">
                          <th className="w-1/5 py-1.5 text-start">Emoloyee Name</th>
                          <th className="w-1/6 py-1.5">Requested Date</th>
                          <th className="w-1/6 py-1.5">From</th>
                          <th className="w-1/6 py-1.5">To</th>
                          <th className="w-1/4 py-1.5">Reason</th>
                          <th className="w-1/6 py-1.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {dashboardData["recentLeaves"].map((leave) => {
                          return (
                            <tr className="text-gray-700 border-b border-gray-300 " key={leave._id}>
                              <td className="py-1.5 text-start">{`${leave.userId.firstname} ${leave.userId.lastname}`}</td>
                              <td className="py-1.5">
                                {new Date(leave.requestDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1.5">
                                {new Date(leave.leaveStartDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1.5">
                                {new Date(leave.leaveEndDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1.5">{leave.reason}</td>
                              <td className=" py-1.5 ">
                                <span
                                  className={
                                    leave.status == "pending"
                                      ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full inline-block min-w-24"
                                      : leave.status == "approved"
                                        ? "bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block min-w-24"
                                        : "bg-red-100 text-red-800 px-2 py-1 rounded-full inline-block min-w-24"
                                  }
                                >
                                  {leave.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="footer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
