/*
export const fetchMessages = async (setMessages, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:5072/api/Message');
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
    } catch (error) {
        console.error('Error fetching messages:', error);
    } finally {
        setIsLoading(false);
    }
};

export const sendMessage = async (newMessageSend, currentUser, currentChatUser, fetchMessages, setNewMessageSend, setIsLoading) => {
    if (newMessageSend.trim()) {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5072/api/Message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newMessageSend,
                    userId: currentUser.userId,
                    chatId: currentChatUser.chatId,
                    createdAt: new Date().toISOString(),
                    image: '',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            setNewMessageSend('');
            fetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    }
};
*/


