import React, {useEffect, useState} from 'react';
import styles from '../styles/ChatApp.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import NewContactWindow from "@/components/NewContactWindow";
import {getUserByEmail, getUserByName, updateUser} from "@/pages/api/user";
import Searchbar from "@/components/SearchField";
import {createChat, getChatById, updateChat} from "@/pages/api/chat";

const defaultChat = {
    name: "",
    messageIds: [],
    userIds: []
}

const ChatApp = ({changeCurrentChat, currentUser, updateCurrentUser, handleLogout}) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const [currentChatUser, setCurrentChatUser] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [currentChatId, setCurrentChatId] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResultsName, setSearchResultsName] = useState([]);
    const [searchResultEmail, setSearchResultEmail] = useState({});
    const [chat, setChat] = useState(defaultChat);
    const [isOpen3, setIsOpen3] = useState(false);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleQueryChange = (value) => {
        const searchTerm = value.target.value.toLowerCase()
        setSearchQuery(searchTerm)
    }

    useEffect(() => {
        const loadSearchResults = async () => {
            try {
                if (searchQuery.trim() != "") {
                    const newUsersWithName = await getUserByName(searchQuery);
                    setSearchResultsName(newUsersWithName);
                    //console.log(currentUser);
                    //console.log(searchResultsName)
                } else {
                    setSearchResultsName([]);
                }
            } catch (e) {
                console.error(e);
                setSearchResultsName([]);
            }
        }
        loadSearchResults()
    }, [searchQuery, setSearchQuery]);

    useEffect(() => {
        const loadSearchResultsEmail = async () => {
            try {
                if (searchQuery.trim() != "") {
                    const newUserWithEmail = await getUserByEmail(searchQuery);
                    setSearchResultEmail(newUserWithEmail);
                    //console.log(currentUser);
                    //console.log(searchResultEmail)
                } else {
                    setSearchResultEmail({});
                }
            } catch (e) {
                console.error(e);
                setSearchResultEmail({});
            }
        }
        loadSearchResultsEmail()
    }, [searchQuery, setSearchQuery]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleMenu1 = () => {
        setIsOpen1(!isOpen1);
        if (isOpen3) {
            setIsOpen3(!isOpen3)
        }
    };

    const handleContactClick = (chatId) => {
        /*if (windowWidth <= 600) {
            router.push(`/chatWindow?user=${chatId.name}`);
        } else {
            setCurrentChatUser(chatId.name);
            setContacts((prevContacts) =>
                prevContacts.map(c =>
                    c.name === chatId.name ? {...c, messages: 0} : c
                )
            );
            changeCurrentChat(chatId)
            setCurrentChatId(chatId)
        }*/
        changeCurrentChat(chatId)
        setCurrentChatId(chatId)
    };
    const createNewChat = async (selectedUser) => {
        //e.preventDefault()

        try {
            let newChat = {
                ...chat
            }
            //maybe implement custom chatName
            newChat.name = `${currentUser.id}&${selectedUser.id}_${currentUser.name},${selectedUser.name}`;
            newChat.userIds = [currentUser.id, selectedUser.id]
            //console.log(newChat)
            //alert(`${newChat.name} ${newChat.userIds}`)
            await createChat(newChat)

            updateCurrentUser()

        } catch (e) {
            //console.error(e)
            alert(e)
        }
    }

    const addToCurrentChat = async (selectedUser) => {
        //implement later not working
        try {
            const currentChat = currentUser.chats.filter(chat => chat.id === currentChatId)
            const fullCurrentChat = await getChatById(currentChat.id)
            console.log(selectedUser.id)
            const newChatName = selectedUser.id + "&" + currentChat.name + "," + selectedUser.name;
            const currentMembers = fullCurrentChat.users.map(user => user.id);
            const newMembers = [...currentMembers, selectedUser.id];
            let updatedChat = {
                name: newChatName,
                messageIds: [],
                userIds: newMembers
            }
            await updateChat(currentChat.id, updatedChat);

            updateCurrentUser()
        } catch (e) {
            console.error(e);
        }
    }

    /*const deleteCurrentChat = async (chatId) => {
        //e.preventDefault()

        try {

            await deleteChat(chatId)

            updateCurrentUser()

        } catch (e) {
            //console.error(e)
            alert(e)
        }
    }*/

    const showEditField = () => {
        setIsOpen3(!isOpen3)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: "",
            email: email,
            password: password,
        };

        try {
            await updateUser(currentUser.id, user);
            updateCurrentUser()
            alert('Updated user!');

        } catch (error) {
            console.error('Error:', error);
            alert('Updating user failed. E-Mail may have already been used.');
        } finally {
            setEmail(currentUser.email);
            setPassword("");
        }
    }


    return currentUser && (
        <div className={styles.chatApp}>
            <nav className={styles.nav}>
                <div className={styles.user}>
                    <div className={styles.avatarUser}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
                             fill="#707070">
                            <path
                                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                        </svg>
                    </div>
                    <div className={styles.spacer}>
                    <span>{currentUser.name}</span>
                    </div>
                    <button className={styles.burger} onClick={toggleMenu1}>
                        {isOpen1 ? (
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
                    </button>
                    <div className={`${styles.navLinks} ${isOpen1 ? styles.navActive : ''}`}>
                        {/*<li><Link href="/login">Login</Link></li>
                        <li><Link href="/register">Register</Link></li>*/}
                        <Link className={styles.dLink} href="/" onClick={handleLogout}>Logout</Link>
                        <Link className={styles.dLink} href="/" onClick={showEditField}>Edit Account</Link>
                    </div>
                    <div className={`${isOpen3 ? styles.editPageActive : styles.editPage}`}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <p>{currentUser.name}</p>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={false}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required={false}
                                />
                            </div>
                            <button type="submit" className={styles.button}>Update User</button>
                        </form>
                    </div>
                </div>
                <div className={styles.searchContainer}>
                    <Searchbar query={searchQuery} onChange={handleQueryChange}/>
                </div>
                <div className={`${styles.contactList} ${isOpen1 ? styles.navActive : ''}`}>
                    <ul className={styles.contacts}>

                        {Object.keys(searchResultEmail).length !== 0 || searchResultsName.length > 0 ?
                            <h4>Users: </h4> : null}
                        {Object.keys(searchResultEmail).length !== 0 && <>
                            {searchResultEmail.email !== currentUser.email && <li className={styles.contactSearch}
                                /*onClick={() => handleContactClick(searchResultEmail.id)}*/>
                                <div className={styles.avatar}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px"
                                         fill="#707070">
                                        <path
                                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                    </svg>
                                </div>
                                <div className={styles.info}>
                                    <span>{searchResultEmail.email}</span>
                                </div>
                                {/*{searchResultEmail.messages > 0 && (
                                    <p className={styles.messages}>{searchResultEmail.messages}</p>
                                )}*/}
                                <button className={styles.createButton}
                                        onClick={() => createNewChat(searchResultEmail)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#707070">
                                        <path
                                            d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>
                                </button>
                                {/*<button className={styles.createButton}
                                        onClick={() => addToCurrentChat(searchResultEmail)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#707070">
                                        <path
                                            d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                                    </svg>
                                </button>*/}
                            </li>}
                        </>}

                        {searchResultsName.map((result, index) => (

                            result.name !== currentUser.name && <li key={index} className={styles.contactSearch}
                                                                    /*onClick={() => handleContactClick(result.id)}*/>
                                <div className={styles.avatar}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px"
                                         fill="#707070">
                                        <path
                                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                    </svg>
                                </div>
                                <div className={styles.info}>
                                    <span>{result.name}</span>
                                </div>
                                {/*{result.messages > 0 && (
                                    <p className={styles.messages}>{result.messages}</p>
                                )}*/}
                                <button className={styles.createButton}
                                        onClick={() => createNewChat(result)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                         viewBox="0 -960 960 960"
                                         width="24px" fill="#707070">
                                        <path
                                            d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>
                                </button>
                                {/*<button className={styles.createButton}
                                        onClick={() => addToCurrentChat(result)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#707070">
                                        <path
                                            d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                                    </svg>
                                </button>*/}
                            </li>
                        ))}


                        <h4>Chats: </h4>
                        {currentUser.chats && currentUser.chats.slice().reverse().map((chat, index) => (
                            currentChatId === chat.id ? (<li key={index} className={styles.contactSelected}
                                                             onClick={() => handleContactClick(chat.id)}>
                                <div className={styles.avatar}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill="#707070">
                                        <path
                                            d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                    </svg>
                                </div>
                                <span>{chat.name.split("_")[1].replace(",", ", ")}</span>
                                {chat.messages > 0 && (
                                    <p className={styles.messages}>{chat.messages}</p>
                                )}

                            </li>) : (
                                <li key={index} className={styles.contact}
                                    onClick={() => handleContactClick(chat.id)}>
                                    <div className={styles.avatar}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                             viewBox="0 -960 960 960" width="24px" fill="#707070">
                                            <path
                                                d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                        </svg>
                                    </div>
                                    <span>{chat.name.split("_")[1].replace(",", ", ")}</span>
                                    {chat.messages > 0 && (
                                        <p className={styles.messages}>{chat.messages}</p>
                                    )}
                                </li>)
                        ))}
                    </ul>
                </div>
            </nav>

            {windowWidth >= 600 && currentChatUser === null && (
                <NewContactWindow/>
            )}

        </div>
    );
};

export default ChatApp;
