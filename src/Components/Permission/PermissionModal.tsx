import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Permission, PermissionModalProps } from './permission';
import { updateUserData } from '../../redux/slices/userSlice';
import api from '../../../api/api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PermissionModal({ user, setIsPermissionModalOpen }: PermissionModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const roleList = useSelector((state: { role: { roleList: { id: number; roleName: string; description: string; permissions: Permission[] }[] } }) => state.role.roleList);
  const userData = useSelector((state: { user: { userData: { id: number; name: string; role: string; date: string }[] } }) => state.user.userData);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [userData]);

  if (!user) return null;

  const handleTogglePermission = (roleName:string) => {
    setSelectedRole(roleName);
  };

  const handleToggleStatus = (status: string) => {
    if (status === 'active') {
      setSelectedStatus(true);
    } else {
      setSelectedStatus(false);
    }
  };

  const handleSave = () => {
    const newUser = { ...user };
    if (selectedRole) {
      newUser.role = selectedRole;
      
      if(selectedStatus!==undefined)newUser.active = selectedStatus;
      newUser.active = user.active;  
    }
    updateUserApi(newUser);
    toast('User permissions updated successfully');
    setIsPermissionModalOpen(false);
  };

  const updateUserApi = (newUser: { id: number; name: string; role: string; date: string; active: boolean }) => {
    api.put(`/users/${user.id}`, newUser).then((response) => {
      dispatch(updateUserData(newUser));
    }).catch((error) => {
      console.error(error);
      toast.error('Error updating user permissions');
    });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Permissions for {user.name}</h2>
        <div className="space-y-3">
            {roleList.map(role => (
              <label key={role.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="radio"
                name="role"
                value={role.roleName}
                checked={selectedRole === role.roleName}
                onChange={() => handleTogglePermission(role.roleName)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="capitalize text-gray-700">{role.roleName}</span>
              </label>
            ))}
        </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Status</h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    required
                    // checked={user.status === 'active'}
                    onChange={() => handleToggleStatus('active')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="capitalize text-gray-700">Active</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    required
                    // checked={user.status === 'inactive'}
                    onChange={() => handleToggleStatus('inactive')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="capitalize text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end space-y-reverse space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => {setIsPermissionModalOpen(false)}}
            className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}