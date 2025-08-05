import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
}

export default function MessageList() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!input.trim() || !chatId || !currentUser) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: currentUser.uid,
      text: input.trim(),
      timestamp: serverTimestamp()
    });

    setInput("");
  };

  return (
    <div>
      <h2>Chat: {chatId}</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map(msg => (
          <p key={msg.id} style={{ fontWeight: msg.senderId === currentUser?.uid ? "bold" : "normal" }}>
            {msg.text}
          </p>
        ))}
      </div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Write a message..." 
        className="absolute bg-black"
      />
      <button onClick={handleSendMessage} style={{ width: "18%" }}>
        Send
      </button>
    </div>
  );
}
