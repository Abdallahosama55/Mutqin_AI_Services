import React, { useEffect, useState } from "react";
import "./SideBarAdmin.css";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { PiArrowsCounterClockwise } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const list = [
  { title: "Dashboard", icon: <RxDashboard />, link: "dashboard" },
  { title: "User Dashboard", icon: <FiUsers />, link: "#" },
  { title: "Registered Users", icon: <LuUserCheck />, link: "#" },
  {
    title: "Transactions",
    icon: <PiArrowsCounterClockwise />,
    link: "#",
  },
];

const SideBarAdmin = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);

  return (
    <div className="  p-5 side-bar-edit  h-100 bg-white w-100">
      <div className=" mb-4">AI PANEL</div>
      <ul className=" d-flex flex-column gap-3 list-unstyled">
        {list.map((page, index) => (
          <li key={index}>
            <Link
              onClick={() => setActiveLink(page.link)}
              to={page.link}
              className={`${
                activeLink === page.link && "isActiveLink "
              } d-flex   text-black gap-3 w-100 bg align-items-center link-hovers`}>
              {page.icon}
              <div>{page.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <div className=" mt-5">
        <button className=" w-100 border-0 bg-white p-0  d-flex gap-3 align-items-center">
          <CiLogout />
          <div>log out</div>
        </button>
      </div>
    </div>
  );
};

export default SideBarAdmin;
