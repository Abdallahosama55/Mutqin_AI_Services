// api.js

import { useMutation } from 'react-query';

const updateConversationTitle = async ({ chatId, newTitle }) => {
  const response = await fetch(`https://backend.mutqinai.com/api/v1/chatbot/conversations/${chatId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ title: newTitle })
  });

  if (!response.ok) {
    throw new Error('Failed to update conversation title');
  }

  return response.json();
};

export default { updateConversationTitle };
