import { setChats, addChat } from "./reducers/chatSlice";

export const setChatsAction = (chats) => (dispatch) => {
  dispatch(setChats(chats));
};

export const addChatAction = (chat) => (dispatch) => {
  dispatch(addChat(chat));
};
