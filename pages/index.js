import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import styles from '../styles/ChatWindow.module.css';
import ChatApp from "@/components/ChatApp";
import ChatWindow from "@/components/ChatWindow";
import {getUserById} from "@/pages/api/user";
import {getChatById} from "@/pages/api/chat";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import LoginForm from "@/components/LoginForm";

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
    text: "",
    createdAt: "",
    image: null,
    user: {
        id: 0,
        name: "",
        email: ""
    }

}

const Home = () => {
    let currentUserID = null;
    const router = useRouter();
    const [currentUserId, setCurrentUserId] = useState(null);
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
    //const [newMessage, setNewMessage] = useState(defaultMessage);
    //const [chat, setChat] = useState(defaultChat);

    //console.log(currentChatMessages);

    useEffect(() => {
        const loadCurrentUser = async () => {
            if (currentUserId != null) {

                try {
                    const newCurrentUser = await getUserById(currentUserId);
                    setCurrentUser(newCurrentUser);
                    //console.log(currentUser);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        loadCurrentUser()
        const interval = setInterval(() => {
            loadCurrentUser()
        }, 60000);
        return () => clearInterval(interval);
    }, [[], currentUserId, setCurrentUserId]);

    useEffect(() => {
        const loadCurrentChat = async () => {
            if (currentChatId) {
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
    useEffect(() => {
        const joinChat = async (chatName, username, email) => {

            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("http://localhost:5095/chat")
                    .configureLogging(LogLevel.Information)
                    .build();

                connection.on("JoinSpecificChat", (username, msg) => {
                    console.log("message: ", msg)
                })

                connection.on("ReceiveSpecificMessage", (messageId, messageText, messageCreatedAt, messageImage, messageUserId, messageUsername, messageUserEmail) => {

                    //console.log(messageCreatedAt)


                    let newMessage = {
                        id: parseInt(messageId),
                        text: messageText,
                        createdAt: messageCreatedAt,
                        image: messageImage,
                        user: {
                            id: parseInt(messageUserId),
                            name: messageUsername,
                            email: messageUserEmail
                        }
                    }

                    const newCurrentMessages = [...currentChatMessages, newMessage]

                    setCurrentChatMessages(currentChatMessages => [...currentChatMessages, newMessage]);
                    //console.log(newMessage)
                })


                connection.on("ReceiveSpecificMessageDeletion", (deletedMessageId) => {
                    setCurrentChatMessages(currentChatMessages => {

                        return currentChatMessages.filter(message => message.id !== parseInt(deletedMessageId));
                    });


                })

                connection.on("ReceiveSpecificChatDeletion", (deletedChatId) => {
                    setCurrentChatMessages(currentUser => [])
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


    const loginFunction = (id) => {
        setCurrentUserId(id);
    }

    const handleLogout = () => {
        setCurrentUserId(null)
    }
    /*useEffect(() => {
        setCurrentUser(getUserById(currentUserId))
        console.log(currentUser);
    }, [currentUser])*/

    if (currentUserId === null) {
        return <LoginForm loginFunction={loginFunction}/>
    }

    return (
        <div>
            <main className={styles.mainGrid}>
                {/* ChatApp component to display list of users and current chat */}
                {currentUser && <ChatApp
                    currentChatUser={user} // Pass current user fetched from router
                    currentChat={currentChat} // Pass current chat
                    changeCurrentChat={handleChangeCurrentChat}
                    currentUser={currentUser}
                    updateCurrentUser={updateCurrentUser}
                    handleLogout={handleLogout}// Handler for changing current chat
                />}
                {currentUser && windowWidth >= 600 && (
                    <ChatWindow
                        currentChat={currentChat}// Pass current chat user
                        currentConnection={currentConnection}// Retrieve messages for current chat user
                        onSendMessage={handleSendMessage}
                        currentUser={currentUser}
                        currentChatMessages={currentChatMessages}
                        updateCurrentUser={updateCurrentUser}
                        currentUserId={currentUserId}
                        changeCurrentChat={handleChangeCurrentChat}// Handler for sending messages (not implemented here)
                    />
                )}
                {/* Conditional rendering of ChatWindow based on window width and current chat user */}
            </main>
        </div>
    );
}

export default Home;
