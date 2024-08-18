import React, { useEffect, useState } from "react";

import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Outlet, useLocation } from "react-router-dom";

import "./AppLayoutmot.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import openSideIcon from "@/assets/logo.png";
import HistoryArticles from "@/Util/HistoryArticles";
import WelcomeModal from "../../components/molecules/WelcomeModal";
import { useSelector } from "react-redux";
import OfferModal from "../../components/molecules/offerModal/OfferModal";
import ContentSection from "@/pages/ContentSections";
const AppLayoutmot = ({ chats, setChats, showChat, setShowChat }) => {
  const [openSideBar, setOpenSideBar] = useState(true);

  //Change between Chat and Main SideBar
  // const [sideBar, setSideBar] = useState(true);

  //Change between TwoChats
  const [switchSideBar, setSwitchSideBar] = useState(true);

  const [selectedSection, setSelectedSection] = useState("");
  const userWordsRemain = useSelector((state) => state.api.userWordsRemain);
  //close when screen is mobile
  const [sideBar, setSideBar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setOpenSideBar(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { pathname } = useLocation();

  return (
    <>
    <div className=" opacity-0 h-0 w-0 visually-hidden">
    <ContentSection/>
    </div>
  
    <OfferModal/>
    <div className="  py-2   w-100 applayout">

<div>
{userWordsRemain===0? <WelcomeModal/>:""}

</div>
   

  
      <div className={`    position-relative h-100  w-100   `}>
        <MdOutlineArrowForwardIos
          src={openSideIcon}
          style={
            !openSideBar
              ? {
                  rotate: "180deg",
                  transitionDuration: "500ms",
                }
              : { transitionDuration: "500ms" }
          }
          onClick={() => setOpenSideBar(!openSideBar)}
          alt=" OpenIcon"
          className=" position-absolute z-3   d-lg-none  openSideBarIcon "
        />
        <div style={{ height: "65px" }}>
          <header className=" h-100  px-md-4 px-2   pb-1  headerLayout">
            <Navbar/>

            {/* <NavCArticle /> */}
            {/* {pathname.includes("create-article") && <NavCArticle />} */}
          </header>
        </div>
        <div className=" d-flex  ">
          <main className=" flex-grow-1 mt-2 ms-md-4 " style={ {width:"91%"}}>
            <Outlet />
          </main>
          <div
            dir="rtl"
            
            className={`${
              openSideBar ? " media-close-sidebar  ms-2 me-4  mt-2 " : " closeSideBar  "
            }  `}
          >
          <div className="  ">
        
          <Sidebar
          setOpenSideBar={setOpenSideBar}
          openSideBar={openSideBar}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
          </div>
        
            {pathname.includes("/create-article") ||
            pathname.includes("/content-section") ||
            pathname.includes("reformulate") ||
            pathname.includes("/editor") ? (
              <HistoryArticles />
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AppLayoutmot;
