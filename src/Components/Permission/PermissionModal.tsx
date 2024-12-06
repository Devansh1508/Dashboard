import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Permission, PermissionModalProps } from './permission';
import { updateUserData } from '../../redux/slices/userSlice';

export function PermissionModal({ user, setIsPermissionModalOpen }: PermissionModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>();
  const roleList = useSelector((state: { role: { roleList: { id: number; roleName: string; description: string; permissions: Permission[] }[] } }) => state.role.roleList);
  const userData = useSelector((state: { user: { userData: { id: number; name: string; role: string; date: string }[] } }) => state.user.userData);

  const dispatch = useDispatch();

  useEffect(() => {
  }, [userData]);

  if (!user) return null;

  const handleTogglePermission = (roleName:string) => {
    setSelectedRole(roleName);
  };

  const handleSave = () => {
    const newUser = { ...user };
    if (selectedRole) {
      newUser.role = selectedRole;
    }
    dispatch(updateUserData(newUser))
    setIsPermissionModalOpen(false);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Permissions for {user.name}</h2>
        <div className="space-y-3">
            {roleList.map(role => (
              <label key={role.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => handleTogglePermission(role.roleName)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="capitalize text-gray-700">{role.roleName}</span>
              </label>
            ))}
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