import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AddUserModal } from "./AddUserModal.tsx";
import { UserPermission } from "./permission";
import { useDispatch, useSelector } from "react-redux";
import { setIsVisible } from "../../redux/slices/formSlice.ts";
import { deleteUserData } from "../../redux/slices/userSlice.ts";
import { PermissionModal } from "./PermissionModal.tsx";
import { motion, Variants } from "framer-motion";
import api from "../../../api/api.ts";
import {toast} from 'react-toastify';
import "./css/permissionTable.css";


const PermissionTable: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserPermission | null>(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const userData = useSelector((state: { user: { userData: UserPermission[] } }) => state.user.userData);

  const dispatch = useDispatch();

  const handleEdit = (user: UserPermission) => {
    setSelectedUser(user);
    setIsPermissionModalOpen(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: number) => {
    deleteUserApi(id);
    toast('User deleted successfully');
  };

  const deleteUserApi = (id: number) => {
      api.delete(`/users/${id}`).then(() => {
      dispatch(deleteUserData({ id }));
    }).catch((error) => {
      console.error(error);
    });
  }

  // useEffect(() => {}, [userData]);

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <div className="w-[96%]">
        <div className="mb-4 flex justify-end">
          <motion.button
            onClick={() => dispatch(setIsVisible(true))}
            className="inline-flex max-sm:text-sm max-sm:p-2 items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <PersonAddIcon />
            Add User
          </motion.button>
        </div>

        {/* Desktop view */}
          <motion.div className="hidden md:block"
          // animate={{ x: -100 }}
          initial={{ opacity: 0}}
          animate={{
            opacity: 1, 
            transition: { ease: ["easeIn", "easeOut"] }
          }}
          // transition={{ duration: 0.3, delay: 1, ease: "linear" }}
        >
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="permission-table-header">#</th>
                <th className="permission-table-header">Name</th>
                <th className="permission-table-header">Role</th>
                <th className="permission-table-header">Date</th>
                <th className="permission-table-header">Status</th>
                <th className="permission-table-header">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {item.role}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td
                    className={`px-4 ${
                      item.active === true 
                      // || item.active === "active"
                        ? "text-green-400"
                        : "text-red-600"
                    } font-bold py-4 text-sm text-gray-500`}
                  >
                    {item.active === true
                    //  || item.active === "active"
                      ? "Active"
                      : "Inactive"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {userData.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow p-4"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                <div>
                  {item.role}
                </div>
                </div>

                <div className="flex h-[100%] space-x-2">
                  {" "}
                  <div>
                    <h3
                      className={` ${
                        item.active === true 
                        // || item.active === "active"
                          ? "text-green-400"
                          : "text-red-600"
                      } text-lg font-medium text-gray-900`}
                    >
                      {item.active === true 
                      // || item.active === "active"
                        ? "Active"
                        : "Inactive"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Date</span>
                  <span className="text-sm text-gray-900">{item.date}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={`${isPermissionModalOpen ? "" : "hidden"}`}>
        <PermissionModal
          user={selectedUser}
          setIsPermissionModalOpen={setIsPermissionModalOpen}
        />
      </div>

      <AddUserModal />
    </>
  );
};

export default PermissionTable;
