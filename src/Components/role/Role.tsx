import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {PermissionBadge} from '../Permission/PermissionBadge';
import { Permission } from '../Permission/permission';
import { useDispatch } from 'react-redux';
import { setIsVisible } from '../../redux/slices/formSlice';

interface RoleProps {
    roleName: string;
    description: string;
    permissions: Permission[];
    addRole: () => void;
    deleteRole: () => void;
}

const Role: React.FC<RoleProps> = ({ roleName, description, permissions, addRole, deleteRole }) => {
    const dispatch = useDispatch();
    
    return (
        <div className="bg-secondary w-[20vw] border-md p-5">
            <div className="flex justify-between text-3xl">
                <div className='flex'>
                <AdminPanelSettingsIcon style={{fontSize:'50px'}}/>
                <h2>{roleName}</h2>
                </div>
                <EditIcon onClick={() => dispatch(setIsVisible(true))} style={{ fontSize: '30px', cursor:'pointer', fill: '#038ff7' }} />
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
                    <DeleteIcon onClick={()=>{deleteRole()}} style={{ fontSize: '30px', fill: '#dc2626', cursor:'pointer' }} />
            </div>
        </div>
    );
};

export default Role;