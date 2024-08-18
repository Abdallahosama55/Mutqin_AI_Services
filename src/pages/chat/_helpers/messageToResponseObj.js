export default function messageToResponseObj({message, fromUser, id, chatId}) {
    return {
        id,
        conversation: chatId,
        reloaded_message: [],
        content: message,
        is_from_user: fromUser,
    }
}