import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PermissionModal } from './PermissionModal.tsx';
import { AddUserModal } from './AddUserModal.tsx';
import { PermissionBadge } from './PermissionBadge.tsx';
import { UserPermission, Permission } from './permission';
import { useDispatch } from 'react-redux';
import { setIsVisible } from '../../redux/slices/formSlice.ts';
import './css/permissionTable.css';

const PermissionTable: React.FC = () => {
    const [data, setData] = useState<UserPermission[]>([
        { 
            id: 1, 
            name: 'John Doe', 
            permissions: ['read', 'create'], 
            date: '2023-10-01' 
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            permissions: ['read', 'create', 'update', 'delete'], 
            date: '2023-10-02' 
        },
    ]);

    const [selectedUser, setSelectedUser] = useState<UserPermission | null>(null);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

    const dispatch=useDispatch();

    const handleEdit = (user: UserPermission) => {
        setSelectedUser(user);
        setIsPermissionModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setData(data => data.filter(item => item.id !== id));
    };

    const handleSavePermissions = (id: number, newPermissions: Permission[]) => {
        setData(data => data.map(item =>
            item.id === id ? { ...item, permissions: newPermissions } : item
        ));
    };

    const handleAddUser = (name: string, permissions: Permission[]) => {
        const newUser: UserPermission = {
            id: data[data.length-1].id + 1,
            name,
            permissions,
            date: new Date().toISOString().split('T')[0]
        };
        setData(data => [...data, newUser]);
    };

    return (
        <>
            <div className="w-[96%] overflow-hidden">
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={() => dispatch(setIsVisible(true))}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <PersonAddIcon/>
                        Add User
                    </button>
                </div>

                {/* Desktop view */}
                <div className="hidden md:block">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="permission-table-header">
                                    #
                                </th>
                                <th className="permission-table-header">
                                    Name
                                </th>
                                <th className="permission-table-header">
                                    Permissions
                                </th>
                                <th className="permission-table-header">
                                    Date
                                </th>
                                <th className="permission-table-header">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">
                                        <div className="flex flex-wrap gap-1">
                                            {item.permissions.map(permission => (
                                                <PermissionBadge key={permission} permission={permission} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">
                                        {item.date}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile view */}
                <div className="md:hidden space-y-4">
                    {data.map((item, index) => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs text-gray-500">#{index + 1}</span>
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 p-1"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 p-1"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-xs text-gray-500 block mb-1">Permissions</span>
                                    <div className="flex flex-wrap gap-1">
                                        {item.permissions.map(permission => (
                                            <PermissionBadge key={permission} permission={permission} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block">Date</span>
                                    <span className="text-sm text-gray-900">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PermissionModal
                isOpen={isPermissionModalOpen}
                user={selectedUser}
                onSave={handleSavePermissions}
            />

            <AddUserModal
                onAdd={handleAddUser}
            />
        </>
    );
};

export default PermissionTable;