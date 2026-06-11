import { FaRegCalendar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

export const employeeCardData = [
  {
    icon: <FaRegCalendar/>,
    title: "Leaves Taken",
    className: "bg-blue-200 rounded-full text-2xl p-5 text-blue-800 text-center",
    employeeDashboardCardKey: "leaveTaken",
  },
  {
    icon: <FaRegStar />,
    title: "Leaves Remainig",
    className: "bg-green-200 rounded-full text-2xl p-5 text-green-800 text-center",
    employeeDashboardCardKey: "leavesRemaining",
  },
  {
    icon: <FaRegClock />,
    title: "Present Days",
    className: "bg-orange-200 rounded-full text-2xl p-5 text-orange-800 text-center",
    employeeDashboardCardKey: "presentDays",
  },
  {
    icon: <FaRegCalendar />,
    title: "Leaves Pending",
    className: "bg-red-200 rounded-full text-2xl p-5 text-red-800 text-center",
    employeeDashboardCardKey: "pendingLeaves",
  },
];


