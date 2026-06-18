import { useState } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/sidebar/Sidebar";
import Loader from "../components/Loader";
import Button from "../components/Button";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Error from "../components/Error";
import AdminLayOut from "../components/AdminLayOut";

function ApplyLeave() {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  // const [hamburgerIcon, setHamburgerIcon] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  //  const [totalDays, setTotalDays] = useState(0);
  const [reason, setReason] = useState("");

  const clickHandler = async () => {
    setLoader(true);

    try {
      const createdLeave = await axios.post(
        `${SERVER_URL}/api/leaves`,
        {
          leaveStartDate: fromDate,
          leaveEndDate: toDate,
          reason,
        },
        { withCredentials: true },
      );
      console.log(createdLeave);
      setFromDate("");
      setToDate("");
      setReason("");

      alert("leaved applied successfully");
    } catch (err) {
      console.log(err);
      return setError(err.response?.data.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-50">
      {error && <Error error={error} setError={setError} />}
      <AdminLayOut>
        <div className="h-full flex-1">
          {loader && <Loader />}
          <div className="main px-5 py-5 flex gap-5 flex-col mt-1">
            <div className="main px-5 py-5 flex gap-5 flex-col mt-1">
              <h1 className="text-sm font-semibold">Apply Leaves</h1>
            </div>
            <div className=" mainContainer">
              <div className="inputFields  p-3 rounded-xl bg-white w-4/5 max-w-4/5 mx-auto flex flex-col gap-5 ">
                <div className="inputsRow flex justify-between">
                  <div className="flex flex-col w-2/5 gap-1">
                    <label htmlFor="fromDate" className="text-sm font-semibold">
                      From Date
                    </label>
                    <DatePicker
                      autoComplete="off"
                      id="fromDate"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter from date"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div className="flex flex-col w-2/5 gap-1">
                    <label htmlFor="fromDate" className="text-sm font-semibold">
                      To Date
                    </label>
                    <DatePicker
                      autoComplete="off"
                      id="toDate"
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter To date"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1.5 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="reason" className="text-sm font-semibold">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    placeholder="Enter Reason Here"
                    type="text"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                    className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 w-full h-30"
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <Button value={"Submit"} clickHandler={clickHandler} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayOut>

      {/* {(
        <div className="flex">
          <Sidebar hamburgerIcon={hamburgerIcon} />

          <div className="flex flex-col w-full max-w-full">
            <Header
              hamburgerIcon={hamburgerIcon}
              setHamburgerIcon={setHamburgerIcon}
            />
            <div className="main px-5 py-5 flex gap-5 flex-col mt-1">
                          <div className="main px-5 py-5 flex gap-5 flex-col mt-1">
              <h1 className="text-sm font-semibold">Apply Leaves</h1>
            </div>
            <div className=" mainContainer">
              <div className="inputFields  p-3 rounded-xl bg-white w-4/5 max-w-4/5 mx-auto flex flex-col gap-5 ">
                <div className="inputsRow flex justify-between">
                  <div className="flex flex-col w-2/5 gap-1">
                    <label htmlFor="fromDate" className="text-sm font-semibold">
                      From Date
                    </label>
                    <DatePicker
                      autoComplete="off" 
                      id="fromDate"
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter from date"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div className="flex flex-col w-2/5 gap-1">
                    <label htmlFor="fromDate" className="text-sm font-semibold">
                      To Date
                    </label>
                    <DatePicker
                      autoComplete="off" 
                      id="toDate"
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Enter To date"
                      className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 py-1.5 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="reason" className="text-sm font-semibold">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    placeholder="Enter Reason Here"
                    type="text"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                    className=" placeholder:text-gray-400 border border-gray-200 focus:outline-gray-400 text-sm rounded px-2 w-full h-30"
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <Button value={"Submit"} clickHandler={clickHandler} />
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

export default ApplyLeave;
