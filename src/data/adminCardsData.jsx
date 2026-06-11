import { AiOutlineTeam } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { FaRegCalendarXmark ,FaRegCalendarMinus } from "react-icons/fa6";


export const adminCardsData = [
  {
    title: "Total Employees",
    icon: <AiOutlineTeam  />,
    valueKey:"totalEmployees",
    className:" bg-blue-200 rounded-full text-2xl p-5 text-blue-800"
  },
  {
    title: "Leaves Requests",
    icon: <FaRegCalendarMinus  />,
    valueKey:"totalLeaves",
    className  :" bg-orange-200 rounded-full text-2xl p-5 text-orange-800"
    

  },
  {
    title: "Approved Leaves",
    icon: <FaRegCalendarCheck />,
    valueKey:"approvedLeaves",
    className :" bg-green-200 rounded-full text-2xl p-5 text-green-800" 
    
  },
  {
    title: "Rejected Leaves",
    icon: <FaRegCalendarXmark />,
    valueKey:"rejectedLeaves",
    className :" bg-red-200 rounded-full text-2xl p-5 text-red-800" 
    
  },
  {
    title: "Pending Leaves",
    icon: <LuCalendarClock />,
    valueKey:"pendingLeaves",
    className :" bg-yellow-200 rounded-full text-xl p-5 text-yellow-800" 
    
  }
];

export default adminCardsData;