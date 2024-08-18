import axios from "axios";
import toast from "react-hot-toast";

const url = "https://backend.mutqinai.com/api"; //import.meta.env.VITE_BACKEND_BASE_URL;

const token = localStorage.getItem("token");

export const getAllChats = async () => {
  try {
    const chats = await axios.get(`${url}/v1/chatbot/conversations/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return chats.data;
  } catch (error) {
    // throw error;
  }
};

export const getMessages = async (id) => {
  try {
    const res = await axios.get(
      `${url}/v1/chatbot/conversations/${id}/messages/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    //throw error;
    console.log(error);
  }
};

export const newChat = async (title, message, model) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("favourite", "false");
    formData.append("archive", "false");
    formData.append("ai_model", model);

    const response = await axios.post(
      `${url}/v1/chatbot/conversations/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.id) {
      // send the request to add the message to the chat that was created
      const messageFormData = new FormData();
      messageFormData.append("conversation", response.data.id);
      messageFormData.append("content", message);
      messageFormData.append("ai_model", model);
      await axios.post(
        `${url}/v1/chatbot/conversations/${response.data.id}/messages/create/`,
        messageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return (window.location.href = `/ChatRoutes/${response.data.id}`);
    }
  } catch (error) {
    console.error("Mutation error=>>>>>>>>.:", error.response.data.error.ar);
    toast.error( error.response.data.error.ar)
    
  }
};
export const newMessage = async (id, content, ai_model = "Google PalM 2") => {
  try {
    const model = ai_model === "rep" ? "Google PalM 2" : ai_model;
    const messageFormData = new FormData();
    messageFormData.append("conversation", id);
    messageFormData.append("content", content);
    messageFormData.append("ai_model", model);

    const res = await axios.post(
      `${url}/v1/chatbot/conversations/${id}/messages/create/`,
      messageFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data=>>>:", error);
  }
};

export const changeChatModel = async (id, model) => {
  try {
    const formData = new FormData();
    formData.append("ai_model", model);
    const res = await axios.patch(
      `${url}/v1/chatbot/conversations/${id}/`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error updating chat model", error);
  }
};
