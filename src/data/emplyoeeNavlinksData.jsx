import { IoHomeOutline , IoLogOutOutline} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProfile } from "react-icons/ai";
import { FaRegCalendarMinus ,FaRegClock } from "react-icons/fa6";


export const emplyoeeNavlinksData = [
  {
    title: "Dashboard",
    path: "/employee-dashboard",
    icon: <IoHomeOutline className="text-lg" />,
  },
  {
    title: "Appy Leave",
    path: "/apply-leave",
    icon: <FaRegCalendarMinus className="text-lg" />
  },
    {
    title: "Attendance",
    path: "/my-attendance",
    icon: <FaRegClock className="text-lg" />,
  },
  {
    title: "My Leaves",
    path: "/my-leaves",
    icon: <AiOutlineProfile className="text-lg" />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgProfile className="text-lg" />,
  },
  {
  
    title: "Logout",
    path: "/logout",
    icon: <IoLogOutOutline className="text-lg" />
  }
];
