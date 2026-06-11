import { RiTeamFill } from "react-icons/ri";
import { adminNavLinksData } from "../../data/adminNavlinksData";
import { emplyoeeNavlinksData } from "../../data/emplyoeeNavlinksData";
import NavItem from "./NavItem";
import { useContext } from "react";
import RoleContext from "../../context/RoleContext";





function Sidebar({ hamburgerIcon }) {
const {role} = useContext(RoleContext);
const navLink = role === "admin" ? adminNavLinksData : emplyoeeNavlinksData;

  return (
    <>
      {hamburgerIcon && (
        <div className="w-1/6 h-screen bg-blue-800 flex flex-col items-center text-white px-1 py-2 gap-5 min-w-44">
          <div className=" flex items-center justify-center gap-2 py-3">
            <RiTeamFill className=" scale-x-125 text-xl " />
            <h1 className=" font-bold text-xl">EMS</h1>
          </div>

          <nav className="w-full px-1">
            <ul className=" gap-3">
              {navLink.map((linkData) => {
                return (
                  <NavItem
                    key={linkData.path}
                    path={linkData.path}
                    title={linkData.title}
                    icon={linkData.icon}
                  />
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;
