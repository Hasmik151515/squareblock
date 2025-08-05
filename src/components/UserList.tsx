import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface User {
  uid: string;
  email?: string;
}

export default function UserList({ currentUserUid, onSelectUser }: { currentUserUid: string; onSelectUser: (user: User) => void }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data() as User);
      setUsers(usersList);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      {users
        .filter(user => user.uid !== currentUserUid) 
        .map(user => (
          <div key={user.uid}>
            <span>{user.email}</span>
            <button onClick={() => onSelectUser(user)}>Ընտրել օգտվող</button>
          </div>
        ))}
    </div>
  );
}
