import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
import Error from "../components/Error";
import { employeeCardData } from "../data/employeeCardData";
import EmployeeDashboardCard from "../components/EmployeeDashboardCard";
import {useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employeeDashboardData, setEmployeeDashboardData] = useState({
    leaveTaken: 0,
    leavesRemaining: 0,
    presentDays: 0,
    pendingLeaves: 0,
    userName: "",
    recentLeaves: [],
  });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [hamburgerIcon, setHamburgerIcon] = useState(true);

  useEffect(() => {
    const fetchEmployeeDashboardData = async () => {
      try {
        setError("");
        setLoader(true);

        const employee = await axios.get(`${SERVER_URL}/api/users/user`, {
          withCredentials: true,
        });

        console.log(employee);

        const today = new Date();

        let startYear;
        let endYear;

        if (today.getMonth() >= 3) {
          startYear = today.getFullYear();
          endYear = startYear + 1;
        } else {
          endYear = today.getFullYear();
          startYear = endYear - 1;
        }

        const fyStartDate = new Date(startYear, 3, 1);
        const fyEndDate = new Date(endYear, 2, 31);

        const totalDaysOfThisMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
        ).getDate();

        const monthStartDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        );
        const monthEndDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          totalDaysOfThisMonth,
        );

        const leaves = employee.data.data.leave;
        const attendances = employee.data.data.attendance;

        const leavesTakenThisYear = leaves.filter((leave) => {
          return (
            new Date(leave.leaveStartDate) >= fyStartDate &&
            new Date(leave.leaveEndDate) <= fyEndDate
          );
        }).length;

        const presentDaysThisMonth = attendances.filter((attendance) => {
          return (
            new Date(attendance.createdAt) >= monthStartDate &&
            new Date(attendance.createdAt) <= monthEndDate
          );
        }).length;

        setEmployeeDashboardData((prev) => ({
          ...prev,
          leaveTaken: leavesTakenThisYear,
          leavesRemaining:
            employee.data.data.quatedLeaves - leavesTakenThisYear,
          presentDays: presentDaysThisMonth,
          pendingLeaves: leaves.filter((leave) => {
            return leave.status === "pending";
          }).length,
          userName:
            employee.data.data.firstname + " " + employee.data.data.lastname,
          recentLeaves: leaves.slice(-3).reverse(),
        }));
      } catch (err) {
        console.log(err);
        setError(
          err.response.data.message || "error while fetching employee details",
        );
      } finally {
        setLoader(false);
      }
    };
    fetchEmployeeDashboardData();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden  bg-gray-50 ">
      {error && <Error error={error}  setError = {setError} />}
      {loader && <Loader />}
      { (
        <div className="flex">
          <Sidebar hamburgerIcon={hamburgerIcon} />

          <div className="flex flex-col w-full max-w-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />
            <div className="main px-8 py-3 flex flex-col mt-1 ">
              <h1 className=" capitalize">{`Welcome , ${employeeDashboardData.userName}`}</h1>

              <div className="flex justify-evenly flex-1 p-3">
                {employeeCardData.map((card) => {
                  return (
                    <EmployeeDashboardCard
                      key = {card.employeeDashboardCardKey}
                      employeeCardData={card}
                      employeeDashboardData={employeeDashboardData}
                      
                    />
                  );
                })}
              </div>
              <div >
                <div className="pb-3">Recent Leaves</div>
                <div className="bg-white p-5 w-9/10 mx-auto mt-1 rounded-2xl border border-gray-200 shadow shadow-gray-200">
                  <table className="w-full">
                    <thead className="text-center">
                      <tr className="border-b border-gray-100">
                        <th className="w-1/5 py-1">Requested Date</th>
                        <th className="w-1/5">From Date</th>
                        <th className="w-1/5">To Date</th>
                        <th className="w-1/5">Reason</th>
                        <th className="w-1/5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {employeeDashboardData.recentLeaves.map((leave) => {
                        return (
                          <tr className="border-b border-gray-100" key={leave._id}>
                            <td className="py-1">
                              {new Date(leave.requestDate).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td>
                              {new Date(
                                leave.leaveStartDate,
                              ).toLocaleDateString("en-IN", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </td>
                            <td>
                              {new Date(leave.leaveEndDate).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                },
                              )}
                            </td>
                            <td className=" capitalize">{leave.reason}</td>
                            <td className=" capitalize">
                              {" "}
                              <span
                                className={
                                  leave.status == "pending"
                                    ? "bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full inline-block min-w-24"
                                    : leave.status == "approved"
                                      ? "bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block min-w-24"
                                      : "bg-red-100 text-red-800 px-2 py-0.5 rounded-full inline-block min-w-24"
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
                  <div className="flex justify-center pt-5 px-10">
                    <button
                    
                      onClick={() => 
                        navigate("/my-leaves")
                      }
                      className="text-blue-400 cursor-pointer px-1"
                    >
                      View All
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
