import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {PermissionBadge} from '../Permission/PermissionBadge';
import { Permission } from '../Permission/permission';
import { useDispatch } from 'react-redux';
import { deleteRole } from '../../redux/slices/roleSlice';
import { setIsVisible } from '../../redux/slices/formSlice';

interface RoleProps {
    id: number;
    roleName: string;
    description: string;
    permissions: Permission[];
    setExistingRole: (role: {
        id: number;
        roleName: string;
        description: string;
        permissions: string[];
    }) => void;
}

const Role: React.FC<RoleProps> = ({ id, roleName, description, permissions,  setExistingRole }) => {
    const dispatch = useDispatch();
    const handleEdit = () => {
        setExistingRole(
            {
                id: id,
                roleName: roleName,
                description: description,
                permissions: permissions
            }
        );
        dispatch(setIsVisible(true));
    }
    
    return (
        <div className="bg-secondary w-[98%] rounded-lg hover:bg-gray-200 shadow-md border-md p-5">
            <div className="flex justify-between text-3xl">
                <div className='flex'>
                <AdminPanelSettingsIcon style={{fontSize:'50px'}}/>
                <h2>{roleName}</h2>
                </div>
                <EditIcon onClick={() => handleEdit()} style={{ fontSize: '30px', cursor:'pointer', fill: '#038ff7' }} />
            </div>
            <p className='text-gray-500'>
                {description.length > 50 ? `${description.substring(0, 50)}...` : description}
            </p>
            <p className='mt-3 font-medium'>Permissions:</p>
            <ul className='flex gap-3 pt-2'>
                {permissions.map(permission => (
                    <PermissionBadge key={permission} permission={permission} />
                ))}
            </ul>
            <div className='flex justify-end'>
                    <DeleteIcon onClick={()=>{dispatch(deleteRole(id))}} style={{ fontSize: '30px', fill: '#dc2626', cursor:'pointer' }} />
            </div>
        </div>
    );
};

export default Role;