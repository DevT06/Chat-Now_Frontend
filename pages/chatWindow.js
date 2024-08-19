import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import styles from '../styles/ChatWindow.module.css';
import ChatWindow from "@/components/ChatWindow";
import {getUserById} from "@/pages/api/user";
import {getChatById} from "@/pages/api/chat";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

/*const defaultChat = {
    name: "",
    messageIds: [
    ],
    userIds: [
        0
    ]
}*/

const defaultMessage = {
    id: 0,
    name: "",
    createdAt: "",
    image: null,
    user: {
        id: 0,
        name: "",
        email: ""
    }

}

const ChatWindowPage = () => {
    const currentUserID = 1;
    const router = useRouter();
    const [currentUserId, setCurrentUserId] = useState(2);
    const [currentUser, setCurrentUser] = useState(null);
    const {user} = router.query; // Fetching user from router query
    const [currentChatUser, setCurrentChatUser] = useState(null); // State to track current chat user
    const [windowWidth, setWindowWidth] = useState(0); // State to track window width
    const [currentChatId, setCurrentChatId] = useState(null); // State to track current chat
    const [chats, setChats] = useState([]); // State to store chats
    const [currentChat, setCurrentChat] = useState(null); // maybe change to empty object {}
    const [currentChatMessages, setCurrentChatMessages] = useState([]);
    const [currentConnection, setCurrentConnection] = useState(null);
    const [loadingCurrentChat, setLoadingCurrentChat] = useState(true);
    const [newMessage, setNewMessage] = useState(defaultMessage);
    //const [chat, setChat] = useState(defaultChat);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const newCurrentUser = await getUserById(currentUserID);
                setCurrentUser(newCurrentUser);
                //console.log(currentUser);
            } catch (e) {
                console.error(e);
            }
        }
        loadCurrentUser()
        const interval = setInterval(() => {
            loadCurrentUser()
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadCurrentChat = async () => {
            try {
                const newCurrentChat = await getChatById(currentChatId);
                setCurrentChat(newCurrentChat);
                //await joinChat(currentChat.name, currentUser.name, currentUser.email)
                //console.log(newCurrentChat);
                setLoadingCurrentChat(false)
            } catch (e) {
                console.error(e);
            }
        }
        setLoadingCurrentChat(true)
        loadCurrentChat()
    }, [currentChatId, setCurrentChatId]);

    useEffect(() => {
        const loadCurrentChatMessages = () => {
            setCurrentChatMessages(currentChat.messages)
        }
        if (!loadingCurrentChat) {
            loadCurrentChatMessages()
        }
    }, [currentChat, setCurrentChat])

    const reloadCurrentChat = async () => {
        const updatedCurrentChat = getChatById(currentChatId);
        setCurrentChat(updatedCurrentChat);
    }

    useEffect(() => {
        const joinChat = async (chatName, username, email) => {

            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("http://localhost:5072/chat")
                    .configureLogging(LogLevel.Information)
                    .build();

                connection.on("JoinSpecificChat", (username, msg) => {
                    console.log("message: ", msg)
                })

                connection.on("ReceiveSpecificMessage", (messageId, messageText, messageCreatedAt, messageImage, messageUserId, messageUsername, messageUserEmail) => {
                    newMessage.id = messageId;
                    newMessage.text = messageText;
                    newMessage.createdAt = messageCreatedAt;
                    newMessage.image = messageImage;
                    newMessage.user.id = messageUserId;
                    newMessage.user.name = messageUsername;
                    newMessage.user.email = messageUserEmail;

                    setCurrentChatMessages(currentChatMessages => [...currentChatMessages, newMessage]);
                    //reloadCurrentChat();

                })

                await connection.start();
                await connection.invoke("JoinSpecificChat", chatName, username, email) //use {username, chatRoom} for object generation

                setCurrentConnection(connection)

            } catch (e) {
                console.log(e)

            }

        }
        if (currentConnection != null) {
            currentConnection.stop()
            //console.log("stopped current connection")
        }
        //console.log(currentConnection)

        if (!loadingCurrentChat) {
            joinChat(currentChat.name, currentUser.name, currentUser.email);
            //console.log("Test pass" + currentConnection)
        }

    }, [currentChat, setCurrentChat]);


    const updateCurrentUser = async () => {
        try {
            const newCurrentUser = await getUserById(currentUserID);
            setCurrentUser(newCurrentUser);
            //console.log(currentUser);
        } catch (e) {
            console.error(e);
        }
    }
    /*const callCreateNewChat = async (newChat) => {
        //e.preventDefault()

        try {
            setChat(newChat)
            await createChat(chat);
            alert("chat created")
        } catch (e) {
            console.error(e)
        }
    }*/

    // Function to handle changing current chat
    const handleChangeCurrentChat = (newCurrentChatId) => {
        setCurrentChatId(newCurrentChatId);
        //console.log(newCurrentChatId);
    }

    // Function to handle sending messages (not implemented in your provided code)
    const handleSendMessage = (message) => {
        // Implement logic to send message
    }

    // useEffect to update windowWidth state on mount and resize
    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Initial setup
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /*useEffect(() => {
        setCurrentUser(getUserById(currentUserId))
        console.log(currentUser);
    }, [currentUser])*/

    return currentUser && (
        <div>
            <main className={styles.mainGrid}>
                <ChatWindow
                    currentChat={currentChat}// Pass current chat user
                    currentConnection={currentConnection}// Retrieve messages for current chat user
                    onSendMessage={handleSendMessage}
                    currentUser={currentUser}
                    currentChatMessages={currentChatMessages}// Handler for sending messages (not implemented here)
                />
                {/* Conditional rendering of ChatWindow based on window width and current chat user */}
            </main>
        </div>
    );
}

export default ChatWindowPage;
