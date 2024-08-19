const URL = "http://localhost:5072/api";

export async function getChatById(id) {
    const response = await fetch(`${URL}/chat/${id}`);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the chat");
    }

    const data = await response.json();
    return data;
}

export async function createChat(chat) {
    const response = await fetch(`${URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
    });

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("Chat already exists");
        } else {
            throw new Error("An error occurred while creating the chat");
        }
    }

    const data = await response.json();
    return data;
}

export async function updateChat(id, chat) {
    const response = await fetch(`${URL}/chat/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
    });

    if (!response.ok) {
        throw new Error("An error occurred while creating the chat");
    }

    const data = await response.json();
    return data;
}

export const deleteChat = async (id) => {
    try {
        const response = await fetch(`${URL}/chat/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "text/plain",
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete chat');
        }
    } catch (error) {
        console.error('Failed to delete chat:', error);
    } finally {

    }
};