import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

interface GroupChatProps {
  currentUserEmail: string;
}

interface Message {
  sender: string;
  text: string;
  timestamp: any;
}

export default function GroupChat({ currentUserEmail }: GroupChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, "groupChat"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data() as Message));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "groupChat"), {
      sender: currentUserEmail,
      text: message,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
