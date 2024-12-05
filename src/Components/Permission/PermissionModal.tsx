import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setIsVisible } from '../../redux/slices/formSlice';
import { Permission, PermissionModalProps } from './permission';


export function PermissionModal({ isOpen, user, onSave }: PermissionModalProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
    const AVAILABLE_PERMISSIONS: Permission[] = ['read', 'create', 'update', 'delete', 'admin'];

    const isVisible = useSelector((state: { form: { isVisible: boolean } }) => state.form.isVisible);
    const dispatch=useDispatch();

  useEffect(() => {
    if (user) {
      setSelectedPermissions(user.permissions);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleTogglePermission = (permission: Permission) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = () => {
    onSave(user.id, selectedPermissions);
    dispatch(setIsVisible(false));
  };

  return (
    <div className={`fixed ${isVisible?'':'hidden'} inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Permissions for {user.name}</h2>
        <div className="space-y-3">
          {AVAILABLE_PERMISSIONS.map(permission => (
            <label key={permission} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission)}
                onChange={() => handleTogglePermission(permission)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="capitalize text-gray-700">{permission}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end space-y-reverse space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => dispatch(setIsVisible(false))}
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