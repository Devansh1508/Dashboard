import React, { useState, useEffect } from "react";
import { setIsVisible } from "../../redux/slices/formSlice";
import { useDispatch } from "react-redux";

interface AddRoleProps {
  addRole: (role: {
    id: number;
    roleName: string;
    description: string;
    permissions: string[];
  }) => void;
  updateRole: (role: {
    id: number;
    roleName: string;
    description: string;
    permissions: string[];
  }) => void;
  roleList: {
    id: number;
    roleName: string;
    description: string;
    permissions: string[];
  }[];
  existingRole?: {
    id: number;
    roleName: string;
    description: string;
    permissions: string[];
  };
}

const AddRole: React.FC<AddRoleProps> = ({ addRole, updateRole, roleList, existingRole }) => {
  const [roleName, setRoleName] = useState(existingRole?.roleName || "");
  const [description, setDescription] = useState(existingRole?.description || "");
  const [permissions, setPermissions] = useState<string[]>(existingRole?.permissions || []);
  const dispatch = useDispatch();

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
    const newRole = {
      id: existingRole ? existingRole.id : roleList.length + 1,
      roleName: roleName,
      description: description,
      permissions: permissions,
    };
    if (existingRole) {
      updateRole(newRole);
    } else {
      addRole(newRole);
    }
    dispatch(setIsVisible(false));
  };

  return (
    <div className="w-[30vw] border-2 bg-secondary border-gray-300 p-4 rounded-xl">
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
        <div className="flex gap-2">
          <button
            className="bg-tertiary text-white p-4 rounded-lg py-2"
            type="submit"
          >
            {existingRole ? "Update Role" : "Add Role"}
          </button>

          <button
            className="bg-red-500 text-white p-4 rounded-lg py-2"
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