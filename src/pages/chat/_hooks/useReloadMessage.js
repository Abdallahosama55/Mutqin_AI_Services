import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

export default function useReloadMessage() {
    const queryClient = useQueryClient();

    const {mutate: reloadMessage, data: newMessage, isLoading: isReloadingNewMessage} = useMutation({
        mutationFn: async ({chatId, messageId}) => {
            const headers = {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            console.log(`https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/messages/${messageId}/reload-response/`)

            const chat = await axios.post(`https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/messages/${messageId}/reload-response/`, {}, {headers})

            return chat.data
        }, onSuccess: async (data) => {
    
            await queryClient.invalidateQueries('chat');
        }
    })

  return {reloadMessage, newMessage, isReloadingNewMessage};
}