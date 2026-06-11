import { IoMdMenu } from "react-icons/io";
function Header ({hamburgerIcon , setHamburgerIcon}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const imageUrl = user?.image;
    const role = user?.role;
    const name = user?.firstname

    const clickHandler= () => setHamburgerIcon(!hamburgerIcon);

    return(
        <div className="flex justify-between items-center w-full pl-6 pr-10  py-3 shadow-md bg-white">
            <IoMdMenu onClick={()=>clickHandler()}className=" text-2xl text-black"/>
            <div className=" overflow-hidden gap-2 flex justify-center items-center ">
                <img src={imageUrl} alt="userImage" className="w-6 object-cover rounded-full"  />
                <span className=" capitalize text-sm font-semibold">{role=="admin"?role:name}</span>
                
            </div>
        </div>

    )
}

export default Header;