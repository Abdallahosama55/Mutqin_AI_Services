import React from "react";
import ChooseModel from "../_components/ChooseModel";
import { Stack } from "react-bootstrap";
import ChatExample from "../_components/ChatExample";
import MessageInput from "../_components/MessageInput";
import styled from "styled-components";
import useStartChat from "../_hooks/useStartChat";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversation } from "@/redux/slices/chatSlice";
import { setTitle, setMessage } from "@/redux/slices/chatSlice";

import logo from "@/assets/logo.svg";
import WelcomeModal from "../../../components/molecules/WelcomeModal";

const examples = [
  {
    title: "إنشاء استراتيجية تسويق",
    description:
      "  ما هي العوامل  التي يجب معرفتها عند إنشاء استراتيجية تسويق  ؟",
  },
  {
    title: "التخطيط لحملة على وسائل التواصل الاجتماعي",
    description: "قم بصياغة حملة على وسائل التواصل الاجتماعي لبراند ملابس.",
  },
  {
    title: "زيادة معدلات النقر إلى الظهور",
    description:
      "اقترح طرق مبتكرة لزيادة معدلات النقر على رسائل البريد الإلكتروني.",
  },
  {
    title: "تحسين تجربة خدمة العملاء لدينا",
    description: "اقترح علينا كيف يمكننا تحسين تجربة خدمة العملاء لدينا؟",
  },
];

const Main = styled.div`
  padding: 14px;
  display: grid;

  height: calc(100vh - 54px);
  @media (min-width: 1200px) { /* Adjust the min-width value as needed */
  padding-left: 12%; /* Adjust the padding values for larger screens */
  height: calc(100vh - 54px);
  padding-right:12%; /* Adjust the padding values for larger screens */
  grid-template-rows:1fr auto auto;

}
@media (max-width: 768px) {
  height: calc(87vh - 54px);
  grid-template-rows:auto auto auto;
}

`;

const ChatLogo = styled.img`
  width: 150px;
  @media (max-width: 768px) {
    width: 150px;
   
  }
`;
const Headline = styled.h1`
  font-weight: 600;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const Description = styled.p`
  font-size: 18px;
  color: #5225ce;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ChatHeader = styled.header`
  display: grid;
  flex-direction: column;
  gap: 24px;
 
  align-items: center;
  justify-items: center;
  text-align: center;
  font-size: 24px;
  color: #5225ce;


  @media (min-width: 390px) and (max-width: 750px) {

  }
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 9px;
  }
`;

const StartChat = styled(Stack)`
  width: 75%;
  margin: 0 auto;
margin-top:10px;
  @media (max-width: 950px) {
    width: 100%;
    margin-top:15px;
  }
  @media (max-width: 768px) {

  }

`;

function Welcome() {
  const { startChat, isLoading } = useStartChat();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userWordsRemain = useSelector((state) => state.api.userWordsRemain);
  const handleSubmit = (title, message) => {


    dispatch(setTitle(title));
    dispatch(setMessage(message))
    startChat(
      { title, message },
      {
        onSuccess: async (data) => {
   
          navigate(`/chat/${data.id}?message=${message}`);
          dispatch(setCurrentConversation(data.id));
          await queryClient.invalidateQueries("chats");
        },
        onError: (error) => {
          console.log("hallllo i have error =>>>>>>>",error);
        },
      }
    );
  };

  return (
    <Main>

   
        <ChatHeader>

        <div>
        <ChatLogo src={logo} alt={"Motqin logo"} />
        <div className=" py-2">
          <Headline>مرحبا بك في مُتقِن شات</Headline>
          <Description>كيف أستطيع مساعدتك اليوم؟</Description>
        </div>
        </div>
     

         
        </ChatHeader>

        <StartChat direction={"vertical"} gap={4}>
          <ExamplesGrid>
            {examples.map((example, index) => (
              <ChatExample
                key={index}
                title={example.title}
                description={example.description}
                onClick={() => handleSubmit(example.description, example.description)}
              />
            ))}
          </ExamplesGrid>
       
          <MessageInput
          onSubmit={(message) => handleSubmit(message, message)}
          isDisabled={isLoading}
        />
    
      
        </StartChat>

    </Main>
  );
}

export default Welcome;