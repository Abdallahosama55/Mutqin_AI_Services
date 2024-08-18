import React from "react";
import "@/components/ChatRoutes/ChatRoutes.css";
import "@/Util/ChatSideBar.css";
import * as Yup from "yup";

import switcherIcon from "@/assets/Images/sideBar/toggleSidebar.png";
import chatIconPages from "@/assets/Images/sideBar/chatIconPage.png";
import { BiPlusMedical } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { TfiSearch } from "react-icons/tfi";
import "@/pages/ChatRoutes/StartChatPage.css";

import { FaPlus } from "react-icons/fa";
// import "../../pages/ChatRoutes/StartChatPage.css";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartChat from "@/components/StartChat/StartChat";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ChatSideBar = ({
  setSideBar,
  setSwitchSideBar,
  switchIcon,
  switchSideBar,
  chats,
  setChats,
  showChat,
  setShowChat,
  openSideBar,
  setOpenSideBar,
}) => {
  const navigate = useNavigate();
  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission if needed
    // You can perform additional actions here
    setSubmitting(false);
    resetForm();
  };
  const searchFunction = (searchTerm) => {

  };

  //Adding new chat
  function newChat() {
    const newChatId = chats.length > 0 ? chats[chats.length - 1].id + 1 : 1;
    const newChat = { id: newChatId };
    setChats((prevChats) => [...prevChats, newChat]);
    setShowChat(newChatId); // Set the showChat to the new chat
    navigate(`/ChatRoutes/${newChatId}`);
  }

  function navigateToChat(id, updatedContent) {
    navigate(`/ChatRoutes/${id}`);
    setShowChat(id);
  }

  return (
    <div dir="ltr" className=" w-100  allsidebar  bg-white">
      <div dir="rtl">
        <div className=" toggleIcon">
          {switchIcon && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setSwitchSideBar(!switchSideBar)}
                style={{ padding: "0px", border: "none", outline: "none" }}
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={switcherIcon}
                  alt="switcher"
                />
              </button>
              <IoClose
                onClick={() => setOpenSideBar(!openSideBar)}
                className=" openSideIcon"
              />
            </div>
          )}
        </div>
        <div className=" sidebarContainer">
          <div>
            {/* {!openSideBar ? (
              <BiPlusMedical
                onClick={() => newChat()}
                style={{
                  color: "#001A78",
                  cursor: "pointer",
                }}
              />
            ) : (
              <button
                className="add-button"
                // style={{
                //   border: " 1px solid #001A78",
                //   backgroundColor: "white",
                //   width: "100%",
                //   display: "flex ",
                //   position: "relative",
                //   textAlign: "center",
                // }}
                onClick={() => newChat()}>
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    color: "#001A78",
                  }}>
                  اضف محادثة
                </div>
                <BiPlusMedical
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translatey(-50%)",
                    color: "#001A78",
                  }}
                />
              </button>
            )} */}
            <button
              className="add-button"
              // style={{
              //   border: " 1px solid #001A78",
              //   backgroundColor: "white",
              //   width: "100%",
              //   display: "flex ",
              //   position: "relative",
              //   textAlign: "center",
              // }}
              onClick={() => newChat()}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: "#001A78",
                }}
              >
                اضف محادثة
              </div>
              <BiPlusMedical
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translatey(-50%)",
                  color: "#001A78",
                }}
              />
            </button>
          </div>
          <div className="position-relative d-flex formik-custom px-2 align-items-center justify-content-between mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange }) => (
                <Form className=" position-relative w-75  ">
                  <Field
                    className="formik-field-custom w-100 "
                    type="text"
                    id="search"
                    name="search"
                    placeholder="بحث..."
                    value={values.search}
                    onChange={(e) => {
                      handleChange(e); // Update Formik state
                      searchFunction(e.target.value); // Trigger search function
                    }}
                  />
                  <ErrorMessage name="search" component="div" />
                </Form>
              )}
            </Formik>
            <TfiSearch
              style={{
                color: "#001A78",
              }}
              className=" "
              alt="search"
            />
          </div>
          {openSideBar && (
            <div style={{ padding: " 20px 0 0 0" }}>
              <h1 className=" custom-headOfChats">اخر محادثات</h1>
            </div>
          )}

          <div>
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => navigateToChat(chat.id, chat.content)}
                className=" border-0  buttonChat   d-flex"
              >
                <img src={chatIconPages} alt="chat" style={{ width: "15px" }} />
                <div className=" buttonChatText">انشئ خطة لي محتوي تعليمي</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* <div
        rtl={true}
        style={{ height: "100vh", backgroundColor: "white", maxWidth: "500px" }}
        className=" rounded-4">
        <div>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            style={{ textAlign: "center" }}></MenuItem> 
          <button
            style={{
              border: " 1px solid #001A78",
              backgroundColor: "white",
              width: "100%",
              display: "flex ",
              position: "relative",
              textAlign: "center",
            }}
            onClick={() => newChat()}>
            <div style={{ textAlign: "center", width: "100%" }}>اضف محادثة</div>
            <FaPlus
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translatey(-50%)",
              }}
            />
          </button>

          <button style={{ border: "none", backgroundColor: "white" }}>
            <div
              style={{ border: "none", backgroundColor: "white" }}
              component="form"
              dir="rtl"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              className=" e rounded-3">
              <InputBase
                placeholder="بحث"
                style={{
                  border: "none",
                  backgroundColor: "white",
                  outline: "none",
                }}
              />
            </div>
          </button>
          <div>
            <span className="  text-muted">اخر محادثات</span>
          </div>

          {chats.map((chat) => (
            <button
              key={chat.id}
              style={{ border: "none", backgroundColor: "white" }}
              onClick={() => navigateToChat(chat.id, chat.content)}>
              <div className="  w-100 overflow-y-hidden">
                <div className="text-muted   opacity-75 fw-light">
                  كيفية التسويق الرقمي عبر الانترنت
                </div>{" "}
              </div>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ChatSideBar;
