import { NavLink } from "react-router-dom";
function NavItem(props) {
  return (
    <li className="w-full items-center ">
      <NavLink className={({isActive}) =>`w-full flex items-center py-2.5 pl-4 gap-3 rounded transition-all duration-200 ${isActive? ' bg-blue-700':' hover:shadow-md'}`}  to={props.path}>
        {props.icon}
        <span className=" text-center">{props.title}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
