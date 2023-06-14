import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col w-full max-w-[1220px] mx-auto pt-4 fixed top-0 left-0 right-0">
      {!isHomePage && (
        <Link to="/" className="font-bold text-[30px] leading-[30px] hover:text-rose-500 hover:text-[35px] transition-all duration-300 ease-in-out w-[65px] px-4 md:px-0">
          RQG
        </Link>
      )}
    </div>
  );
};

export default Header;
