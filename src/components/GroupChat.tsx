  import React, { useState, useEffect } from "react";
  import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "../firebase";

  type Props = {
    currentUserEmail: string;
  };

  type Message = {
    id: string;
    text: string;
    sender: string;
    timestamp?: any;
  };
export default function GroupChat({ currentUserEmail }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, "groupChat"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "groupChat"), {
      text: message,
      sender: currentUserEmail,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteDoc(doc(db, "groupChat", id));
  };

  return ( 
    <div className="p-4 max-w-md mx-auto border border-black">

      <div className="border rounded p-2 h-[400px] overflow-y-scroll mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2 flex justify-between items-center">
            <div>
              <strong>{msg.sender}: </strong>
              <span>{msg.text}</span>
            </div>
            {msg.sender === currentUserEmail && (
              <button
                className="text-red-500 ml-2 text-sm"
                onClick={() => handleDeleteMessage(msg.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
