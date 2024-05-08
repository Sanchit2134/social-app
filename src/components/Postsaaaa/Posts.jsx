"use client";

import { socket } from "@/app/socket";
import { useEffect, useState } from "react";

const Posts = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (socket.connected) {
  //     onConnect();
  //   }

  //   socket.on("chat", (msg) => {
  //     console.log("message: " + msg);
  //     setMessages((messages) => [...messages, msg]);
  //   });

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport) => {
  //       setTransport(transport.name);
  //     });
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("like", (data) => {
  //     console.log('data: ', data);
  //   });

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  const sendMessage = () => {
    socket.emit("chat", 
      
    );
    setValue("");
  }

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;