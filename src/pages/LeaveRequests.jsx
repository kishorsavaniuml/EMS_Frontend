import axios from "axios";
import { useState ,useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/Header";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;






function LeaveRequests() {
  const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
const updateClickHandler = async(leaveId , status) => {
    try{
        setError("");
        setLoader(true);

        await axios.put(`${SERVER_URL}/api/leaves/${leaveId}`,{status},{withCredentials:true});
        alert(`leave ${status} successfully`);

        setLeaves((prev)=>
            prev.map((leave)=>leave._id === leaveId ?{...leave , status}:leave))
    }
    catch(err){
        console.log(err);
        setError(err.response.data.message || "error while approving leave")
    }finally{
        setLoader(false);
    }
}


  useEffect(() => {
    const fetchleaves = async () => {
      try {
        setError("");
        setLoader(true);

        const leaves = await axios.get(
          `${SERVER_URL}/api/leaves?page=${page}`,
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
      {error && <Error error={error}  setError = {setError}/>}
      {loader && <Loader />}
      {(
        <div className="flex">
          <Sidebar hamburgerIcon={hamburgerIcon} />
          <div className="w-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />
            <div className="bg-gray-50 h-full p-4 mt-1">
              <h1 className="text-xl font-semibold">Leave Requests</h1>
              <div className="bg-white p-3 w-11/12 mx-auto mt-5 rounded-2xl border border-gray-200">
                <div>
                  {leaves.length == 0 ? (
                    "No Leaves to Show"
                  ) : (
                    <table>
                      <thead className="text-gray-800 text-sm">
                        <tr className="border-b border-gray-300">
                          <th className="w-1/7 py-1">Emoloyee Name</th>
                          <th className="w-1/8 py-1">Requested Date</th>
                          <th className="w-1/8 py-1">From</th>
                          <th className="w-1/8 py-1">To</th>
                          <th className="w-1/6 py-1">Reason</th>
                          <th className="w-1/8 py-1">Status</th>
                          <th className="w-1/8 py-1">Approve</th>
                          <th className="w-1/8 py-1">Reject</th>
                        </tr>
                      </thead>
                      <tbody className="text-center text-sm">
                        {leaves.map((leave) => {
                          return (
                            <tr key={leave._id}className="text-gray-700 border-b border-gray-300">
                              <td className="py-1 capitalize">{`${leave.userId.firstname} ${leave.userId.lastname}`}</td>
                              <td className="py-1">
                                {new Date(leave.requestDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1">
                                {new Date(leave.leaveStartDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1">
                                {new Date(leave.leaveEndDate)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td className="py-1">{leave.reason}</td>
                              <td className=" py-1 ">
                                <span
                                  className={
                                    leave.status == "pending"
                                      ? "bg-yellow-100 text-yellow-800 px-0.5 py-1 rounded-full inline-block min-w-24"
                                      : leave.status == "approved"
                                        ? "bg-green-100 text-green-800 px-0.5 py-1 rounded-full inline-block min-w-24"
                                        : "bg-red-100 text-red-800 px-0.5 py-1 rounded-full inline-block min-w-24"
                                  }
                                >
                                  {leave.status}
                                </span>
                              </td>
                              <td className="py-1"><button onClick={()=>updateClickHandler(leave._id,"approved")} className="bg-green-700 text-white py-1 rounded-full inline-block min-w-24 cursor-pointer hover:bg-green-800">Approve</button></td>
                              <td className="py-1"><button onClick={()=>updateClickHandler(leave._id ,"rejected")} className="bg-red-700 text-white  py-1 rounded-full inline-block min-w-24 cursor-pointer hover:bg-red-800">Reject</button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
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
      )}
    </div>
  );
}

export default LeaveRequests;
