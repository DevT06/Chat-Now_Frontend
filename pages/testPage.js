import Link from "next/link";
import WaitingRoom from "@/components/WaitingRoom";
import {useState} from "react";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

export default function TestPage(methodName, newMethod) {
    const [connection, setConnection] = useState();

    const joinChatRoom = async (username, chatRoom) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5072/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("JoinSpecificChatRoom", (username, msg) => {
                console.log("message: ", msg)
            })

            await connection.start();
            await connection.invoke("JoinSpecificChatRoom", {username, chatRoom}) //use {username, chatRoom} for object generation

            setConnection(connection)

        } catch (e) {
            console.log(e)

        }
    }

    const disconnect = () => {
        connection.stop()
    }


    return (
        <>
            <Link href={"/"}>Home</Link>
            <main>
                <h1>Test Page for SignalR</h1>
                <WaitingRoom joinChatRoom={joinChatRoom}/>
                <button onClick={disconnect}>Disconnect</button>
            </main>
        </>
    )
}