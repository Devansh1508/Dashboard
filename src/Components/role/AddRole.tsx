import React, { useState } from "react";
import { setIsVisible } from "../../redux/slices/formSlice";
import { addRole, updateRole } from "../../redux/slices/roleSlice";
import { useDispatch,useSelector } from "react-redux";
import api from '../../../api/api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddRoleProps {
  existingRole?: {
    id: number;
    roleName: string;
    description: string;
    permissions: string[];
  };
}

interface Role {
  id: number;
  roleName: string;
  description: string;
  permissions: string[];
}

const AddRole: React.FC<AddRoleProps> = ({  existingRole }) => {
  const [roleName, setRoleName] = useState(existingRole?.roleName || "");
  const [description, setDescription] = useState(existingRole?.description || "");
  const [permissions, setPermissions] = useState<string[]>(existingRole?.permissions || []);
  const dispatch = useDispatch();

  const roleList = useSelector((state: { role: { roleList: Role[] } }) => state.role.roleList);
  const allPermissions = ["Read", "Write", "Execute", "Delete"];

  const handleCheckboxChange = (permission: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(permissions.length>0){
      const newRole = {
      id: existingRole ? existingRole.id : roleList.length + 1,
      roleName: roleName,
      description: description,
      permissions: permissions,
    };
    if (existingRole!==undefined) {
      updateRoleApi(newRole);
      toast('Role updated successfully');
    } else {
      addRoleApi(newRole);
      toast('Role added successfully');
    }
    dispatch(setIsVisible(false));
    setRoleName("");
    setDescription("");
    setPermissions([]);
  }
  else{
    toast('Please select at least one permission');
  };}
  
  const updateRoleApi = (newRole: { id: number; roleName: string; description: string; permissions: string[] }) => {
    api.post('/roles', existingRole).then(() => {
    dispatch(updateRole(newRole));
  });
}

const addRoleApi = (newRole: { id: number; roleName: string; description: string; permissions: string[] }) => {
  api.post('/roles', newRole).then(() => {
    dispatch(addRole(newRole));
  });
}

  return (
    <div className="w-[30vw] max-xl:w-[500px] mx-lg:w-[400px] max-sm:w-[80vw] border-2 bg-secondary border-gray-300 p-4 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-4 gap-3 font-medium">
          <label htmlFor="roleName">Role Name</label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex font-medium flex-col gap-3 p-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="p-4">
          <label className="font-medium">Permissions:</label>
          {allPermissions.map((permission) => (
            <div key={permission} className="flex gap-3">
              <input
                type="checkbox"
                id={permission}
                checked={permissions.includes(permission)}
                onChange={() => handleCheckboxChange(permission)}
              />
              <label htmlFor={permission}>{permission}</label>
            </div>
          ))}
        </div>
        <div className="flex gap-2 max-sm:flex-col">
          <button
            className="hover:bg-blue-700 bg-blue-600 max-lg:p-2 text-white p-4 rounded-lg py-2"
            type="submit"
          >
            {existingRole!==undefined ? "Update Role" : "Add Role"}
          </button>

          <button
            className="border-[1px] border-gray-300 max-lg:p-2 p-4 rounded-lg py-2"
            onClick={() => dispatch(setIsVisible(false))}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;