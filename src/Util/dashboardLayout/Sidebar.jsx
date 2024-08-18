import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

import switcherIcon from "@/assets/Images/sideBar/toggleSidebar.png";

import openSideIcon from "@/assets/Images/sideBar/bxs_down-arrow-alt.png";
import logo from "@/assets/logo.svg";
import minLogo from "@/assets/Images/sideBar/logo only.png";

import brain from "@/assets/Images/sideBar/Brain Manage.png";
// import category from "@/assets/Images/sideBar/Category.png";
import activeCategory from "@/assets/Images/sideBar/CategoryActive.png";

import startChatIcon from "@/assets/Images/newSidebar/lets-icons_chat-fill.png";
import activChat from "@/assets/Images/sideBar/chatActive.png";
import mainicon from "../../assets/Images/sideBar/dashboard_black_24dp (1) 1.png";
import helper from "@/assets/Images/newSidebar/solar_help-bold.png";

import sectionContentIcon from "@/assets/Images/newSidebar/ep_menu.png";
// import sectionContentIcon from "@/assets/Images/sideBar/sectionContent.png";
import activeSections from "@/assets/Images/sideBar/avtiveSections.png";

import typingIcon from "@/assets/Images/newSidebar/tabler_writing.png";
// import typingIcon from "@/assets/Images/sideBar/shape.png";
import activeTyping from "@/assets/Images/sideBar/avtiveTyping.png";

import langChecker from "@/assets/Images/newSidebar/basil_edit-solid.png";
// import langChecker from "@/assets/Images/sideBar/magic wand.png";
import activeLangChecker from "@/assets/Images/sideBar/activeLangchecker.png";

import makingphoto from "@/assets/Images/newSidebar/ic_round-image.png";
import star from "@/assets/Images/newSidebar/fluent_star-edit-24-filled.png";
// import makingphoto from "@/assets/Images/sideBar/bxs_image-alt.png";
import activeMakingPhoto from "@/assets/Images/sideBar/activeMakingPhoto.png";

import refresh from "@/assets/Images/sideBar/refresh-circle.png";
import activerefresh from "@/assets/Images/sideBar/activerefresh.png";

import userIcon from "@/assets/Images/sideBar/userIcon.png";

import managing from "@/assets/Images/newSidebar/bxs_doughnut-chart.png";
// import managing from "@/assets/Images/sideBar/bxs_doughnut-chart.png";
import activemanaging from "@/assets/Images/sideBar/activebxs_doughnut-chart.png";

import person from "@/assets/Images/newSidebar/user-2.png";
// import person from "@/assets/Images/sideBar/person.png";
import activeAccount from "@/assets/Images/sideBar/activeAccount.png";
import logout from "@/assets/Images/newSidebar/solar_exit-bold.png";
import { setSearch } from "../../redux/slices/contentSections/contentSectionsSlice";
import { useDispatch } from "react-redux";

const sideSections = [
  {
    title: "الرئيسة",
    icon:mainicon,
    iconActive: activChat,
    link: "/control",
  },

  {
    title: "متقن شات",
    icon: startChatIcon,
    iconActive: activChat,
    link: "chat",
  },

  {
    title: "المحرر الذكي",
    icon: star,
    iconActive: activeMakingPhoto,
    link: "/editor",
  },
];
const contentSection = [
  {
    title: "أقسام المحتوي",
    icon: sectionContentIcon,
    iconActive: activeSections,
    link: "/content-section",
  },
  {
    title: "كتابة مقال كامل",
    icon: typingIcon,
    iconActive: activeTyping,
    link: "/create-article",
  },
  {
    title: "المدقق اللغوي ",
    icon: langChecker,
    iconActive: activeLangChecker,
    link: "/detector",
  },

  {
    title: "إعادة  الصياغة",
    icon: star,
    iconActive: activerefresh,
    link: "/reformulate",
  },
];
const sideSectionsSecond = [
  {
    title: "ادارة الاشتراك",
    icon: managing,
    iconActive: activemanaging,
    link: "/myplan",
  },
  {
    title: "حسابي",
    icon: person,
    iconActive: activeAccount,
    link: "/myaccount",
  },
];
const sideSectionsThired = [
  {
    title: " المحسن البشري",
    icon: brain,
    iconActive: activemanaging,
    link: "/human-philanthropist",
  },
 
];

const Sidebar = ({
  setSwitchSideBar,
  openSideBar,
  setOpenSideBar,
  switchSideBar,
  switchIcon,
  selectedSection,
  setSelectedSection,
}) => {
  const [wordslength, setWordsCount] = useState(850);
  const [wordsUsed, setWordsUsed] = useState(300);
  const widthProgress = (wordsUsed / wordslength) * 100;

  const [minSide, setMinSide] = useState(true);

  const navigate = useNavigate();

  //Upgrade-User For Api
  function upgradeUser() {}
  const dispatch = useDispatch();

  //Nav-To-Page For Api
  function navToPage(sectionTitle) {
    setSelectedSection(sectionTitle);
   
    navigate();
  }
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    // Perform any additional logout logic here if needed

    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page or any other desired page
    navigate("/signin");
  };

  return (
    <div className=" sidbar rounded-2    sidebar-scroll ">
      <div dir="rtl" className="side-container">
        {/* <div className=" d-flex justify-content-center align-items-center">
          {openSideBar ? (
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
              src={logo}
              className=" hover-of-link w-100 h-100 side-logo"
            />
          ) : (
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
              src={logo}
              className=" hover-of-link w-100 h-100 side-logo"
            />
          )}
        </div> */}

        <div className=" main-content  justify-content-between  d-flex ">
          {openSideBar && <div className=" main-text">الرئيسية</div>}
          {openSideBar && (
            <img
              onClick={() => setOpenSideBar(!openSideBar)}
              src={openSideIcon}
              className=" openSideIcon"
            />
          )}

          {/* <FaSignOutAlt
            // src={openSideIcon}
            style={
              !openSideBar
                ? { rotate: "180deg", transitionDuration: "500ms" }
                : { transitionDuration: "500ms" }
            }
            onClick={() => setMinSide(!minSide)}
            alt=" OpenIcon"
            className=" position-absolute openSideBarIcon "
          /> */}
        </div>

        {/* Main  */}
        <ul
          style={openSideBar ? { gap: "8px" } : { rowGap: "30px" }}
          className="side-sections"
        >
          {sideSections.map((section, index) => (
            <Link
              to={section.link}
            
              key={index}
              style={
                selectedSection === section.title && !openSideBar
                  ? {
                      // backgroundColor: "#5225CE",
                      color: "white",
                      justifyContent: "center",
                      padding: "5px",
                    }
                  : { backgroundColor: "" }
              }
              onClick={() => navToPage(section.title)}
              className={`side-section-container  ${ selectedSection === section.title ? "side-section-container-selected" :""}   py-md-2 pe-md-2 text-decoration-none  d-flex gap-1`}
            >
              <img src={section.icon} className="side-icon" />

              {openSideBar && (
                <div

                  className={` title-custom  text-end `}
                >
                  {section.title}
                </div>
              )}
            </Link>
          ))}
        </ul>
        {/* content */}
        <div className=" main-content  d-flex justify-content-start">
          {openSideBar && <div className="    main-text">أدوات المحتوى</div>}
        </div>
        <ul
          style={openSideBar ? { gap: "8px" } : { rowGap: "30px" }}
          className="side-sections"
        >
          {contentSection.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              style={
                selectedSection === section.title && !openSideBar
                  ? {
                      // backgroundColor: "#5225CE",
                      color: "white",
                      justifyContent: "center",
                      padding: "5px",
                    }
                  : { backgroundColor: "" }
              }
              onClick={() => {
                setSelectedSection(section.title);
                dispatch(setSearch({ text:""}));
              }}
              className={`side-section-container ${ selectedSection === section.title ? "side-section-container-selected" :""}  py-md-2 pe-md-2  text-decoration-none${
                section.color ? "  color-red  " : ""
              }   d-flex gap-1`}
            >
              <img src={section.icon} className="side-icon" />
              {/* <img
                src={
                  selectedSection === section.title && !openSideBar
                    ? section.iconActive
                    : section.icon
                }
                className="side-icon"
              /> */}
              {openSideBar && (
                <div
               
                  className="title-custom text-end"
                >
                  {section.title}
                </div>
              )}
            </Link>
          ))}
        </ul>

      {/* account */}

     {/* 
      
            <div className=" main-content  d-flex justify-content-start">
      {openSideBar && <div className="    main-text">منجز</div>}
    </div>
    <ul
      style={openSideBar ? { gap: "8px" } : { rowGap: "30px" }}
      className="side-sections"
    >
      {sideSectionsThired.map((section, index) => (
        <Link
          key={index}
          to={section.link}
          style={
            selectedSection === section.title && !openSideBar
              ? {
                  backgroundColor: "#5225CE",
                  color: "white",
                  justifyContent: "center",
                  padding: "5px",
                }
              : { backgroundColor: "" }
          }
          onClick={() => {
            setSelectedSection(section.title);
          }}
          className={`side-section-container  ${ selectedSection === section.title ? "side-section-container-selected" :""}   py-md-2 pe-md-2 text-decoration-none  d-flex gap-1`}
        >
          <img src={section.icon} className="side-icon" />

          {openSideBar && (
            <div
        
              className="title-custom text-end"
            >
              {section.title}
            </div>
          )}
        </Link>
      ))}
    </ul>
      
      
      
      */}
    
        {/* account */}
        <div className=" main-content  d-flex justify-content-start">
          {openSideBar && <div className="    main-text">العضوية</div>}
        </div>
        <ul
          style={openSideBar ? { gap: "8px" } : { rowGap: "30px" }}
          className="side-sections"
        >
          {sideSectionsSecond.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              style={
                selectedSection === section.title && !openSideBar
                  ? {
                      backgroundColor: "#5225CE",
                      color: "white",
                      justifyContent: "center",
                      padding: "5px",
                    }
                  : { backgroundColor: "" }
              }
              onClick={() => {
                setSelectedSection(section.title);
              }}
              className={`side-section-container  py-md-2 pe-md-2  text-decoration-none${
                section.color ? "  color-red  " : ""
              }   d-flex gap-1`}
            >
              <img src={section.icon} className="side-icon" />
              {/* <img
                src={
                  selectedSection === section.title && !openSideBar
                    ? section.iconActive
                    : section.icon
                }
                className="side-icon"
              /> */}
              {openSideBar && (
                <div
                  style={
                    selectedSection === section.title
                      ? { backgroundColor: "#5225CE", color: "white" }
                      : { backgroundColor: "" }
                  }
                  className="title-custom text-end"
                >
                  {section.title}
                </div>
              )}
            </Link>
          ))}
        </ul>
        {/* Logout */}
        <ul
          style={openSideBar ? { gap: "8px" } : { rowGap: "30px" }}
          className="side-sections"
        >
          <button
            onClick={handleLogout}
            className={` color-red  mt-5  side-section-container py-md-2 pe-md-2 d-flex gap-1`}
         
          >
            <img src={logout} className="side-icon" />
            {openSideBar && (
              <div style={{ width: "70%" }} className="title-custom text-end">
                تسجيل الخروج
              </div>
            )}
          </button>
        </ul>

        {/* progress */}

        {/* {openSideBar && (
          <div className=" w-100  position-relative usesection">
            <img
              src={userIcon}
              className="userIcon"
            />
            <div className="user-numbers d-flex justify-content-between align-items-center">
              <div>{wordsUsed}</div>
              <div>{wordslength}</div>
            </div>
            <div className=" progress-bar">
              <div
                style={{ width: widthProgress }}
                className=" user-progress"
              />
            </div>
            <div
              style={{ marginTop: "10px", textAlign: "center" }}
              className=" userData">
              سجل الاستخدام
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <button
                onClick={() => upgradeUser()}
                className=" user-button">
                ترقية
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;
