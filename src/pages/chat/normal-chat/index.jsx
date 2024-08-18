import React, { useEffect, useState, useRef, memo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import MessageInput from "../_components/MessageInput";
import { Stack } from "react-bootstrap";
import Message from "./_components/Message";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import ChatSkeleton from "./_components/ChatSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversation } from "@/redux/slices/chatSlice";
import useActiveModel from "../_hooks/useActiveModel";
import { selectTitle, selectMessage } from "@/redux/slices/chatSlice";
import toast from "react-hot-toast";

const Main = styled.div`
  padding: 14px;
  display: grid;

  gap: 14px;
  grid-template-rows: 1fr auto;
  height: calc(100vh - 54px);
  @media (min-width: 1200px) {
    padding-left: 22%;
    padding-right: 22%;
  }

  @media (max-width: 768px) {
    height: calc(86vh - 54px);
  }
`;

const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto; /* Changed to overflow-y: auto */
  height: 100%;
`;

const NormalChat = memo(() => {
  const title_welcome = useSelector(selectTitle);
  const message_welcome = useSelector(selectMessage);

  const { chatId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [userMessage, setUserMessage] = useState("");
  const [message_user, setMessage_user] = useState("");
  const dispatch = useDispatch();
  const [Animate, setAnimate] = useState(false);
  const currentConversation = useSelector(
    (state) => state.chat.currentConversation
  );
  const { model } = useActiveModel();
  const containerRef = useRef(null); // Ref for MessageColumn container

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await axios.get(
        `https://backend.mutqinai.com/api/v1/chatbot/conversations/${
          currentConversation || chatId
        }/messages/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    staleTime: Infinity,
  });

  const messages = !isLoading || data ? data?.results?.toReversed() : [];

  const { mutate, isLoading: isWriting } = useMutation({
    mutationKey: ["chat"],
    mutationFn: async (message) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const data = {
        content: message,
        conversation: chatId,
        ai_model: model,
      };

      const chat = await axios.post(
        `https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/messages/create/`,
        data,
        { headers }
      );

      return chat.data;
    },
    onSuccess: async (data) => {
      setUserMessage("");
      setSearchParams({ message: "" });
      searchParams.delete("message");
      await queryClient.invalidateQueries("chat");

    },
    onError: (error) => {
      // Handle the error here
      toast.error(error.response.data.error.ar);
      // You can also add additional error handling logic if needed
    },
  });

  useEffect(() => {
    // Reset state and refetch messages when conversation changes
    setUserMessage("");
    setMessage_user("");
    refetch();
  }, [currentConversation]);

  useEffect(() => {
    // Set current conversation and handle message submission
    dispatch(setCurrentConversation(chatId));
    if (!searchParams.get("message")) return;
    mutate(searchParams.get("message"));
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 15000);
  }, [chatId, searchParams.get("message")]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  // Scroll to bottom whenever messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = (message_user) => {
    // Submit message and handle animation
    mutate(message_user);
    setAnimate(true);
    setMessage_user(message_user);
    setTimeout(() => {
      setAnimate(false);
    }, 15000);
  };

  return (
    <Main dir="rtl">
      <MessageColumn ref={containerRef}>
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <>
            {messages?.map((message) => {
              return (
                <Message
                  response={message}
                  Animate={Animate}
                  key={message.id}
                  message_user={message_user}
                />
              );
            })}

            {userMessage && (
              <Message
                response={{
                  content: userMessage,
                  id: 1234564,
                  is_from_user: true,
                  reloaded_message: [],
                }}
                Animate={Animate}
                message_user={message_user}
              />
            )}

            {isWriting && (
              <Message
                response={{
                  content: "",
                  id: 1234564,
                  is_write: message_user || title_welcome || message_welcome,
                  is_from_user: false,
                  reloaded_message: [],
                }}
                Animate={Animate}
                isResponding={isWriting}
                message_user={message_user}
              />
            )}
          </>
        )}
      </MessageColumn>

      <Stack gap={3} direction={"horizontal"}>
        <MessageInput
          onSubmit={handleMessageSubmit} // Pass the handleMessageSubmit function
          isDisabled={isWriting}
        />
      </Stack>
    </Main>
  );
});

export default NormalChat;
