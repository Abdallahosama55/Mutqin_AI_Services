import {useMutation} from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function useDeleteChat() {
    const {mutate, isLoading} = useMutation({
        mutationFn: async (chatId) => {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            };

            const chat = await axios.delete(`https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/delete/`, {headers})
        },
        onSuccess() {
            toast.success('تم حذف الرساله')
        }
    })

    return {mutate, isLoading}
}