import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";
import { useState } from "react";

function AdminLayOut({ children }) {
  const [hamburgerIcon, setHamburgerIcon] = useState(true);

  return (


      <div className="flex w-full h-full">
        <Sidebar hamburgerIcon={hamburgerIcon} />
        <div className="flex flex-col w-full h-full">
          <Header
            hamburgerIcon={hamburgerIcon}
            setHamburgerIcon={setHamburgerIcon}
          />

          {children}
        </div>
      </div>

  );
}

export default AdminLayOut;
