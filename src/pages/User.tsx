import { useEffect } from "react";
import Thumbnail from "../Components/common/Thumbnail";
import PermissionTable from "../Components/Permission/PermissionTable";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {motion} from 'framer-motion';
import api from '../../api/api'
import {ToastContainer} from 'react-toastify';

const User = () => {

  // using mock api's to get the data 
  useEffect(() => {
    api.get('/users').then(() => {
    });
  }, []);

  return (
    <div className="ml-[16vw] max-xl:ml-3 max-sm:w-[96%] h-[100vh] overflow-x-hidden">
      <motion.div className="flex pt-5 justify-between items-center mb-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 ,transition: { delay: 0.3 }}}
      >
        <input
          type="text"
          placeholder="Search users..."
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
      </motion.div>
      <PermissionTable/>
      <ToastContainer />  
    </div>
  );
};

export default User;
