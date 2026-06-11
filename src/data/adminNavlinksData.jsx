import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { AiOutlineTeam, AiOutlineUserAdd } from "react-icons/ai";
import { FaRegCalendarMinus } from "react-icons/fa6";



export const adminNavLinksData = [
  {
    title: "Dashboard",
    path: "/admin-dashboard",
    icon: <IoHomeOutline className="text-lg" />
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <AiOutlineTeam className="text-lg" />
  },
  {
    title: "Add Employees",
    path: "/add-employee",
    icon: <AiOutlineUserAdd className="text-lg" />
  },
  {
    title: "Leave Requests",
    path: "/leave-requests",
    icon: <FaRegCalendarMinus className="text-lg" />
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <IoLogOutOutline className="text-lg" />
  }
];


