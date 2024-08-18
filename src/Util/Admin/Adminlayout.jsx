import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarAdmin from "./NavBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import "./Adminlayout.css";
import { PiArrowFatLineLeftFill } from "react-icons/pi";

const Adminlayout = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        transition: "ease",
      }}
      className=" lay-out p-2  gap-4 d-flex">
      {open && (
        <aside
          style={{
            transition: "width ease",
            transitionDuration: "1000ms",
          }}
          className=" admin-side-bar">
          <SideBarAdmin />
        </aside>
      )}
      <div className=" position-relative">
        <PiArrowFatLineLeftFill
          style={
            open
              ? {
                  transform: "rotate(180deg)",
                  transition: "ease",
                  transitionDuration: "1000ms",
                }
              : { transition: "ease", transitionDuration: "1000ms" }
          }
          onClick={() => setOpen(!open)}
          className=" position-absolute top-50"
        />
      </div>
      <div className=" flex-grow-1">
        <header>
          <NavBarAdmin />
        </header>
        <div className=" mx-auto  dashboard-container  ">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
