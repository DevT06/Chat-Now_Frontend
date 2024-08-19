import React, {useEffect, useState} from 'react';
import styles from '../styles/ChatWindow.module.css';
import Link from 'next/link';
import {deleteChat, updateChat} from "@/pages/api/chat";

const ChatWindow = ({
                        currentChatUser,
                        onSendMessage,
                        currentChat,
                        currentUser,
                        currentConnection,
                        currentChatMessages,
                        updateCurrentUser,
                        currentUserId,
                        changeCurrentChat
                    }) => {
        const [isOpen2, setIsOpen2] = useState(false);
        const [newMessageText, setNewMessageText] = useState("");
        const [messages, setMessages] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const currentUserID = 1;
        //const [currentChatId, setCurrentChatId] = useState(currentUser.chats[0].id);


        useEffect(() => {
            const scrollDown = () => {
                try {
                    const scrollView = document.getElementById("scrollElement")
                    const lastElement = scrollView.lastElementChild;
                    lastElement.scrollIntoView(false);
                } catch (e) {
                    console.error(e);
                }
            }
            scrollDown()
        }, [currentChat, currentChatMessages]);

        useEffect(() => {
            if (isOpen2) {
                toggleMenu2()
            }
            setNewMessageText("")
        }, [currentChat])

        const toggleMenu2 = () => {
            setIsOpen2(!isOpen2);
        };
        const handleSendMessage = async () => {
            if (newMessageText.trim() !== "") {
                setIsLoading(true);
                try {
                    const newMessage = {
                        text: newMessageText,
                        userId: currentUser.id,
                        chatId: currentChat.id,
                        createdAt: new Date().toISOString()
                    }
                    await currentConnection.invoke("SendMessage", newMessage, currentChat.name);
                    setNewMessageText("")

                } catch (error) {
                    console.error('Failed to send message:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        const handleInputChange = (e) => {
            setNewMessageText(e.target.value);
        };

        const handleDeleteMessage = async (messageId) => {
            //console.log(messageId);
            setIsLoading(true);
            try {
                await currentConnection.invoke("DeleteMessage", messageId, currentChat.name);
            } catch (error) {
                console.error('Failed to delete message:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const deleteCurrentChat = async (chatId) => {
            //e.preventDefault()
            try {
                await deleteChat(chatId)
                updateCurrentUser()
            } catch (e) {
                //console.error(e)
                alert(e)
            }
            toggleMenu2()
            changeCurrentChat(null)
        }

        const exitChat = async (chatId) => {
            try {
                const existingCurrentChat = currentUser.chats.filter(chat => chat.id === chatId)

                const [left, right] = existingCurrentChat.name.split("_");
                const leftParts = left.split("&").filter(part => part !== currentUserId);
                const newLeft = leftParts.join("&");
                const newRight = right.split(",").filter(part => part !== currentUser.name).join(",");

                const result = `${newLeft}_${newRight}`;

                const newMembers = existingCurrentChat.userIds.filter(userId => userId !== currentUserId);
                //const newChatName = selectedUser.id + "&" + currentChat.name + "," + selectedUser.name;
                let updatedChat = {
                    name: result.name,
                    messageIds: [],
                    userIds: newMembers
                }
                await updateChat(chatId, updatedChat);

                updateCurrentUser()
            } catch (e) {
                console.error(e);
            }
        }

        return (
            <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>
                    <div className={styles.avatar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                             viewBox="0 -960 960 960" width="24px" fill="#707070">
                            <path
                                d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                        </svg>
                    </div>
                    {currentChat &&
                        <span style={{marginLeft: 10}}>{currentChat.name.split("_")[1].replace(",", ", ")}</span>}

                    <div className={styles.burger} onClick={toggleMenu2}>
                        {isOpen2 ? (
                            <svg fill="#000000" width="25px" height="25px" viewBox="0 0 16.001 16.001"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="X-16px" transform="translate(0 0)">
                                    <path id="Path_9" data-name="Path 9"
                                          d="M33.707,8,40.854.854a.5.5,0,0,0-.708-.708L33,7.293,25.854.146a.5.5,0,0,0-.708.708L32.293,8l-7.147,7.146a.5.5,0,0,0,.708.708L33,8.707l7.146,7.147a.5.5,0,0,0,.708-.708Z"
                                          transform="translate(-25 0)"/>
                                </g>
                            </svg>
                        ) : (
                            <svg fill="#000000" width="25px" height="25px" viewBox="-7 0 16 16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <path
                                            d="M1,9A1,1,0,1,1,2,8,1,1,0,0,1,1,9ZM2,1A1,1,0,1,0,1,2,1,1,0,0,0,2,1ZM2,15a1,1,0,1,0-1,1A1,1,0,0,0,2,15Z"/>
                                    </g>
                                </g>
                            </svg>
                        )}
                    </div>
                    <div className={`${styles.navLinks} ${isOpen2 ? styles.navActive : ''}`}>
                        {/*<Link className={styles.dLink} href="/testPage">Test Page</Link>*/}
                        {currentChat &&
                            <Link className={styles.dLink} href="/" onClick={() => deleteCurrentChat(currentChat.id)}>
                                Delete Chat
                            </Link>}
                        {/*{currentChat && currentChat.users.length > 2 && <Link className={styles.dLink} href="/" onClick={() => exitChat(currentChat.id)}>
                            Delete Chat
                        </Link>}*/}{/* <li><Link href="/login">Login</Link></li>
                        <li><Link href="/register">Register</Link></li>
                        */}
                    </div>
                </div>
                {currentChat && currentChatMessages && <div className={styles.outerMessageSend} id={"scrollElement"}>
                    <div className={styles.messagesSend}>
                        {/*isLoading ? (
                            <div>Loading messages...</div>
                        ) : (*/
                            currentChatMessages.map((message, index) => (
                                currentUserId === message.user.id ?
                                    <article key={index} className={styles.messageArticleOwn}>
                                        <p className={styles.messageTextOwn}>{message.user.name}</p>
                                        <p className={styles.messageTextOwn}>{message.createdAt.replace("T", " / ").slice(0, 18)}</p>
                                        <div className={styles.messageSendOwn}>
                                            <p className={styles.messageText}>{message.text}</p>
                                            <button className={styles.deleteButton}
                                                    onClick={() => handleDeleteMessage(message.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px"
                                                     viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                                    <path
                                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </article> : <article className={styles.messageArticle} key={index}>
                                        <p className={styles.messageTextOwn}>{message.user.name}</p>
                                        <p className={styles.messageTextCA}>{message.createdAt.replace("T", " / ").slice(0, 18)}</p>
                                        <div className={styles.messageSend}>
                                            <p className={styles.messageText}>{message.text}</p>
                                        </div>
                                    </article>
                            ))
                        }
                    </div>
                </div>}
                {currentChat && currentChatMessages && <form className={styles.inputContainer} onSubmit={handleSendMessage}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Type a message here..."
                        value={newMessageText}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required={true}// Disable input while sending a message
                    />
                    <button
                        className={styles.sendButton}
                        disabled={isLoading}
                        onClick={handleSendMessage}
                        type="submit"// Disable button while sending a message
                    >
                        {isLoading ? (
                            <span>Sending...</span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                                 fill="#707070">
                                <path
                                    d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                            </svg>
                        )}
                    </button>
                </form>}
            </div>
        )
            ;
    }
;

export default ChatWindow;



