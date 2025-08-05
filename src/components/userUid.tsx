import React from "react";

interface User {
  uid: string;
  email?: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  currentUserUid: string;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser, currentUserUid }) => {
  return (
    <div>
      {users
        .filter(user => user.uid !== currentUserUid) 
        .map(user => (
          <div key={user.uid}>
            <span>{user.email || user.uid}</span>
            <button onClick={() => onSelectUser(user)}>Ընտրել օգտվող</button>
          </div>
        ))}
    </div>
  );
};

export default UserList;
