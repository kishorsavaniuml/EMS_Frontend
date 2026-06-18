import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/sidebar/Sidebar";
import { CiCalendar } from "react-icons/ci";
import { TbLogin2, TbLogout } from "react-icons/tb";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import AdminLayOut from "../components/AdminLayOut";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function MarkAttendance() {
  // const [hamburgerIcon, setHamburgerIcon] = useState(true);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [status, setStatus] = useState("Absent");

  const todayDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchTodaysAttendance = async () => {
      try {
        const todaysAttendance = await axios.get(
          `${SERVER_URL}/api/attendances/todayIn`,
          { withCredentials: true },
        );

        if (todaysAttendance.data.data) {
          const timeIn = new Date(todaysAttendance.data.data.checkInTime);

          const checkInTime = timeIn.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          if (todaysAttendance.data.data.checkOutTime) {
            const timeOut = new Date(todaysAttendance.data.data.checkOutTime);

            const checkOutTime = timeOut.toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            setCheckOutTime(checkOutTime);
          }

          setCheckInTime(checkInTime);

          setStatus(todaysAttendance.data.data.status);
        }
      } catch (err) {
        console.log(err.message);
        setError(
          err.response?.data?.message ||
            " error while fectching data for today's attendance",
        );
      }
    };

    fetchTodaysAttendance();
  }, []);

  const checkInClickHandler = async () => {
    try {
      setLoader(true);

      const markedCheckIn = await axios.post(
        `${SERVER_URL}/api/attendances`,
        {},
        { withCredentials: true },
      );

      const databseTime = markedCheckIn.data.data.checkInTime;
      const time = new Date(databseTime);
      const checkInTime = time.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCheckInTime(checkInTime);
      setStatus(markedCheckIn.data.data.status);
      setLoader(false);
      alert("Attendace successfully Marked");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoader(false);
    }
  };

  const checkOutClickHandler = async () => {
    try {
      const updateCheckOut = await axios.put(
        `${SERVER_URL}/api/attendances/todayOut`,
        {},
        { withCredentials: true },
      );
      console.log(updateCheckOut);
      const time = new Date(updateCheckOut.data.data.checkOutTime);
      const checkOutTime = time.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCheckOutTime(checkOutTime);
      alert("attendance check out succesfully");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || "error while check out attendance");
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden  bg-gray-50">
      {error && <Error error={error} setError={setError} />}

      <AdminLayOut>
        <div className="h-full flex-1">
          {loader && <Loader />}
          <div className="mt-1.5 w-4/5 mx-auto flex flex-col gap-3 py-3">
            <h1>Attendance</h1>
            <div className="flex bg-white py-5 items-center rounded-xl shadow shadow-gray-200 ">
              <div className="w-1/2 flex flex-col gap-2 items-center">
                <p>Today's Date</p>
                <div className="flex items-center gap-1">
                  <CiCalendar />
                  <p>{todayDate}</p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-2 items-center">
                <p>Today's Status</p>
                <p className="capitalize">{status}</p>
              </div>
            </div>
            <div className="flex p-4 bg-white gap-2 rounded-xl shadow shadow-gray-200">
              <div className=" flex flex-1 flex-col justify-center items-center outline outline-gray-100 rounded-xl gap-3 py-4">
                <div className="text-sm font-semibold">Check In</div>
                <div className="bg-green-100 rounded-full p-3">
                  <TbLogin2 className="text-5xl text-green-700 " />
                </div>
                <p className="font-semibold text-green-700">
                  {checkInTime || "--/--"}
                </p>
                <button
                  onClick={checkInClickHandler}
                  className="py-1 px-5 rounded text-white text-sm font-semibold bg-green-700"
                >
                  Check In
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center items-center outline outline-gray-100 rounded-xl gap-3 py-4">
                <div className="text-sm font-semibold">Check Out</div>
                <div className="bg-red-100 rounded-full p-3">
                  <TbLogout className="text-5xl text-red-700" />
                </div>
                <p className="font-semibold text-red-700">
                  {checkOutTime || "--/--"}
                </p>
                <button
                  onClick={checkOutClickHandler}
                  className="py-1 px-5 rounded text-white text-sm font-semibold bg-red-700"
                >
                  Check Out
                </button>
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
            <div className="mt-1.5 w-4/5 mx-auto flex flex-col gap-3 py-3">
              <h1>Attendance</h1>
              <div className="flex bg-white py-5 items-center rounded-xl shadow shadow-gray-200 ">
                <div className="w-1/2 flex flex-col gap-2 items-center">
                  <p>Today's Date</p>
                  <div className="flex items-center gap-1">
                    <CiCalendar />
                    <p>{todayDate}</p>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2 items-center">
                  <p>Today's Status</p>
                  <p className="capitalize">{status}</p>
                </div>
              </div>
              <div className="flex p-4 bg-white gap-2 rounded-xl shadow shadow-gray-200">
                <div className=" flex flex-1 flex-col justify-center items-center outline outline-gray-100 rounded-xl gap-3 py-4">
                  <div className="text-sm font-semibold">Check In</div>
                  <div className="bg-green-100 rounded-full p-3">
                    <TbLogin2 className="text-5xl text-green-700 " />
                  </div>
                  <p className="font-semibold text-green-700">
                    {checkInTime || "--/--"}
                  </p>
                  <button
                    onClick={checkInClickHandler}
                    className="py-1 px-5 rounded text-white text-sm font-semibold bg-green-700"
                  >
                    Check In
                  </button>
                </div>
                <div className="flex flex-1 flex-col justify-center items-center outline outline-gray-100 rounded-xl gap-3 py-4">
                  <div className="text-sm font-semibold">Check Out</div>
                  <div className="bg-red-100 rounded-full p-3">
                    <TbLogout className="text-5xl text-red-700" />
                  </div>
                  <p className="font-semibold text-red-700">
                    {checkOutTime || "--/--"}
                  </p>
                  <button
                    onClick={checkOutClickHandler}
                    className="py-1 px-5 rounded text-white text-sm font-semibold bg-red-700"
                  >
                    Check Out
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

export default MarkAttendance;
