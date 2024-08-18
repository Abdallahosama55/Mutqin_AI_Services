import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatSideBar.css";
import { TfiSearch } from "react-icons/tfi";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setCurrentConversation, setNew } from "@/redux/slices/chatSlice";
import styled from "styled-components";
import { PiTrash } from "react-icons/pi";
import useDeleteChat from "../_hooks/useDeleteChat";
import Skeleton from "react-loading-skeleton";
import { BiPlusMedical } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import { AiOutlinePlus } from "react-icons/ai";
import { getAllChats } from "@/redux/actions/chat";
import { MdEdit } from "react-icons/md";
import Model from "./../../../components/templates/model";
import plusicon from "../../../assets/icons/mingcute_plus-fill (2).svg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import axios from "axios";

const ChatLink = styled.p`
  text-wrap: nowrap;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 100;
  margin-bottom: 0;
  z-index: 0;
  position: relative;
  font-size: 13px;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
width:90%
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const SidebarLayout = styled.div`
  display: grid;
  height: calc(100dvh - 100px);
  grid-template-rows: auto auto 1fr;
  gap: 16px;
`;

const BtnActionGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 24px 0 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.5) 90%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ChatActionBtn = styled.button`
  background-color: transparent;
  color: #5225ce;
  border: none;
  padding: 0px 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

const StartChatBtn = styled.button`
  border: 1px solid rgba(105, 43, 239, 0.2);
  background-color: transparent;
  color: #001b79;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);
  position: relative;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #f3f3f3;
  }
`;

const PlusIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const ChatSideBar = ({ offCanvasSelect }) => {
  const [readOnly, setReadOnly] = useState(true); // Initial state is read-only
  const [formValues, setFormValues] = useState({}); // State to store input values
  const inputRefs = useRef({}); // Ref to store input refs
  // Inside your component
  const [isFocused, setIsFocused] = useState(false); // State to track input focus

  // Function to handle input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle input blur
  const handleBlur = () => {
    setIsFocused(false);
  };
  const [editModes, setEditModes] = useState({});

  const handleKeyDown = async (event, chatId) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      const newTitle = formValues[chatId];
      try {
        // Axios patch request to update chat title
        const response = await axios.patch(
          `https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/`,
          { title: newTitle },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Check if the request was successful
        if (response.status === 200) {
          // Update UI or perform any other actions upon successful update
          toast.success("تم تحديث عنوان المحادثة بنجاح  ");
          setReadOnly(true); // Set readOnly back to true after form submission
        } else {
          toast.error("مشكله في تحديث عنوان المحادثه");
          // Handle error scenario, if necessary
        }
      } catch (error) {
        console.error(
          "Error occurred while updating conversation title:",
          error.message
        );
        // Handle error scenario, if necessary
      }
      // You can submit the form or perform any other action here
    }
  };

  const handleButtonClick = (chatId) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [chatId]: !prevModes[chatId],
    }));
    setReadOnly(false); // Set readOnly to false for the clicked chat
    if (inputRefs.current[chatId]) {
      inputRefs.current[chatId].focus();
      inputRefs.current[chatId].style.outline = "2px solid rgb(82, 37, 206)"; // Set outline to rgb(82, 37, 206)
    }
  };

  const handleSubmit = async (chatId, event) => {
    event.preventDefault();
    const newTitle = formValues[chatId];
    try {
      // Axios patch request to update chat title
      const response = await axios.patch(
        `https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}`,
        { title: newTitle },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Update UI or perform any other actions upon successful update
        setReadOnly(true); // Set readOnly back to true after form submission
        setIsFocused(false);
      } else {
        console.error("Failed to update conversation title");
        // Handle error scenario, if necessary
      }
    } catch (error) {
      console.error(
        "Error occurred while updating conversation title:",
        error.message
      );
      // Handle error scenario, if necessary
    }
  };

  const navigate = useNavigate();
  const [chats, setChats] = React.useState([]);
  const [staticData, setStaticData] = React.useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useDeleteChat();

  const { isLoading: chatsLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getAllChats(),
    onSuccess: (data) => {
      setChats(data);
      setStaticData(data);
    },
  });

  const searchFunction = (searchTerm) => {
    const filteredChats = staticData.filter((chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setChats(filteredChats);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <SidebarLayout dir="rtl">
      <div className="fixed p-2">
        <StartChatBtn
          variant={"outline-primary"}
          onClick={() => {
            navigate(`/chat`);
            isMobile && offCanvasSelect();
            dispatch(setNew(true));
          }}
        >
          <span className="new conv"> محادثة جديدة </span>
          <PlusIcon>
            <img src={plusicon} width={18} />
          </PlusIcon>
        </StartChatBtn>
        <div className="search-container  ">
          <Form.Control
            type="search"
            placeholder={"بحث"}
            className="text-center p-1"
            aria-describedby="search"
            onChange={(e) => {
              searchFunction(e.target.value);
            }}
          />

          <TfiSearch
            style={{
              color: "#001B79",
              backgroundColor: "white",
            }}
            className="search-icon ms-2 "
            alt="search"
          />
        </div>
        {/*{openSideBar && <p className="head-of-chats">اخر محادثات</p>}*/}
      </div>
      <span
        style={{
          color: "rgba(0, 27, 121, 0.5)",
          fontSize: "15px",
          marginRight: "10px",
        }}
      >
        أخر المحادثات
      </span>
      <ChatsContainer>
        {chatsLoading ? (
          <>
            <Skeleton height={15} width={230} />
            <Skeleton height={15} width={170} />
            <Skeleton height={15} width={200} />
            <Skeleton height={15} width={150} />
            <Skeleton height={15} width={210} />
            <Skeleton height={15} width={200} />
          </>
        ) : (
          chats?.toReversed().map((chat) => (
            <div key={chat.id} className={"position-relative"}>
              <ChatLink
                onClick={async () => {
                  dispatch(setNew(false));
                  dispatch(setCurrentConversation(chat.id));
                  navigate(`/chat/${chat.id}`);
                  isMobile && offCanvasSelect();
                  // setShowChat(chat.id);
                }}
              >
                <form onSubmit={(e) => handleSubmit(chat.id, e)}>
                  <input
                    ref={(el) => (inputRefs.current[chat.id] = el)}
                    type="text"
                    className={` input-chat-title w-100 bg-transparent`}
                    defaultValue={chat.title}
                    onKeyDown={(e) => handleKeyDown(e, chat.id)}
                    readOnly={!editModes[chat.id]} // Apply readOnly attribute based on edit mode
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [chat.id]: e.target.value,
                      })
                    }
                    onFocus={() => {
                      handleFocus();
                      if (inputRefs.current[chat.id] && !editModes[chat.id]) {
                        inputRefs.current[chat.id].style.outline =
                          "1px solid rgb(82, 37, 206) !important"; // Add !important
                      }
                    }}
                    onBlur={() => {
                      handleBlur();
                      if (inputRefs.current[chat.id]) {
                        inputRefs.current[chat.id].style.outline = "none"; // Reset outline when blurred
                      }
                    }}
                    style={{
                      color: "rgba(0, 27, 121, 1)",
                      outline: editModes[chat.id]
                        ? "2px solid rgb(82, 37, 206) !important"
                        : "none",
                    }}
                  />
                </form>
              </ChatLink>
              <BtnActionGroup
                className={
                  "position-absolute top-50 translate-middle-y start-0 z-4 m-0"
                }
              >
                <Model
                  trigger={
                    <ChatActionBtn variant={""} className="">
                      <RiDeleteBin6Fill size={15} />
                    </ChatActionBtn>
                  }
                  onSubmit={() => {
                    mutate(chat.id, {
                      onSuccess: async () => {
                        await queryClient.invalidateQueries("chats");
                      },
                    });
                    offCanvasSelect();
                  }}
                />
                <ChatActionBtn onClick={() => handleButtonClick(chat.id)}>
                  <MdEdit size={15} />
                </ChatActionBtn>
              </BtnActionGroup>
            </div>
          ))
        )}
      </ChatsContainer>
    </SidebarLayout>
  );
};

export default ChatSideBar;
