import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/sidebar/Sidebar";
import Error from "../components/Error";
import Loader from "../components/Loader";
import axios from "axios";
import AdminLayOut from "../components/AdminLayOut";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function MyLeaves() {
  // const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchleaves = async () => {
      try {
        setError("");
        setLoader(true);

        const leaves = await axios.get(
          `${SERVER_URL}/api/leaves/my-leaves?page=${page}`,
          { withCredentials: true },
        );
        console.log(leaves);

        setLeaves(leaves.data.data);
        setTotalPages(leaves.data.totalPages);
      } catch (err) {
        console.log(err);
        return setError(err.response.data.message);
      } finally {
        setLoader(false);
      }
    };

    fetchleaves();
  }, [page]);

  return (
    <div className="w-screen h-screen  overflow-hidden">
      {error && <Error error={error} setError={setError} />}

      <AdminLayOut>
        <div className="h-full flex-1">
          {loader && <Loader />}
          <div className="bg-gray-50 h-full p-5 mt-1">
            <h1 className="text-xl font-semibold">My Leaves</h1>
            <div className="bg-white p-5 w-9/10 mx-auto mt-5 rounded-2xl border border-gray-200">
              <table className="w-full">
                <thead className="text-center">
                  <tr className="border-b border-gray-100">
                    <th className="w-1/5 pb-2">Requested Date</th>
                    <th className="w-1/5 pb-2">From Date</th>
                    <th className="w-1/5 pb-2">To Date</th>
                    <th className="w-1/5 pb-2">Reason</th>
                    <th className="w-1/5 pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {leaves.map((leave) => {
                    return (
                      <tr className="border-b border-gray-100" key={leave._id}>
                        <td className="py-1 text-sm">
                          {new Date(leave.requestDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="py-1 text-sm">
                          {new Date(leave.leaveStartDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="py-1 text-sm">
                          {new Date(leave.leaveEndDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className=" capitalize py-1 text-sm">
                          {leave.reason}
                        </td>
                        <td className=" capitalize py-1 text-sm">
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
              <div className="flex justify-end pt-5 px-10">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage((prev) => prev - 1);
                  }}
                  className="text-blue-400 cursor-pointer px-1"
                >
                  Prev
                </button>
                <span className="px-1"> {page} </span> of{" "}
                <span className="px-1"> {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                  className="text-blue-400 cursor-pointer px-1"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {loader && <Loader />}
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
            <div className="bg-gray-50 h-full p-5 mt-1">
              <h1 className="text-xl font-semibold">My Leaves</h1>
              <div className="bg-white p-5 w-9/10 mx-auto mt-5 rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead className="text-center">
                    <tr className="border-b border-gray-100">
                      <th className="w-1/5 pb-2">Requested Date</th>
                      <th className="w-1/5 pb-2">From Date</th>
                      <th className="w-1/5 pb-2">To Date</th>
                      <th className="w-1/5 pb-2">Reason</th>
                      <th className="w-1/5 pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {leaves.map((leave) => {
                      return (
                        <tr className="border-b border-gray-100" key={leave._id}>
                          <td className="py-1 text-sm">
                            {new Date(leave.requestDate).toLocaleDateString(
                              "en-IN",
                              {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="py-1 text-sm">
                            {new Date(leave.leaveStartDate).toLocaleDateString(
                              "en-IN",
                              {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="py-1 text-sm">
                            {new Date(leave.leaveEndDate).toLocaleDateString(
                              "en-IN",
                              {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className=" capitalize py-1 text-sm">{leave.reason}</td>
                          <td className=" capitalize py-1 text-sm">
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
                <div className="flex justify-end pt-5 px-10">
                  <button
                    disabled={page === 1}
                    onClick={() => {
                      setPage((prev) => prev - 1);
                    }}
                    className="text-blue-400 cursor-pointer px-1"
                  >
                    Prev
                  </button>
                  <span className="px-1"> {page} </span> of{" "}
                  <span className="px-1"> {totalPages}</span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage((prev) => prev + 1);
                    }}
                    className="text-blue-400 cursor-pointer px-1"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default MyLeaves;
