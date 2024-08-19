import {useState} from "react";

export default function WaitingRoom({joinChatRoom}) {
    const [username, setUsername] = useState();
    const [chatRoom, setChatRoom] = useState();
    const [userField, setUserField] = useState("");

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangeChatRoom = (e) => {
        setChatRoom(e.target.value)
    }

    return <form onSubmit={e => {
        e.preventDefault();
        joinChatRoom(username, chatRoom)
    }}>
        <fieldset>
            {/*<label>Username: </label>*/}
            <input type="text" name="username" placeholder="Username" onChange={handleChangeUsername}
                   required/>
        </fieldset>

        <fieldset>
            {/*<label>ChatRoom: </label>*/}
            <input type="text" name="chatRoom" placeholder="ChatRoom" onChange={handleChangeChatRoom} required/>
        </fieldset>

        <button type="submit">
            Join
        </button>
    </form>

}