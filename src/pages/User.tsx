import { useState } from "react";
// importing components
import { users } from "../Components/userList/UserList";
import UserList from "../Components/userList/UserList";
import Thumbnail from "../Components/common/Thumbnail";
import AddUser from "../Components/userList/AddUser";
// icons from material ui
import NotificationsIcon from "@mui/icons-material/Notifications";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-[16vw] h-[100vh] overflow-x-hidden">
      <div className="flex pt-5 justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-5 items-center pr-4">
          <div className="ml-4 relative cursor-pointer">
            <NotificationsIcon />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </div>
          <div className="cursor-pointer">
            <Thumbnail name="John Doe" bgColor="#2f98fd" />
          </div>
        </div>
      </div>
      <AddUser />

      <UserList />
    </div>
  );
};

export default User;
