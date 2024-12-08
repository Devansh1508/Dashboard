import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PermissionBadge } from "../Permission/PermissionBadge";
import { Permission } from "../Permission/permission";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/slices/roleSlice";
import { setIsVisible } from "../../redux/slices/formSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../../api/api";

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

const Role: React.FC<RoleProps> = ({
  id,
  roleName,
  description,
  permissions,
  setExistingRole,
}) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setExistingRole({
      id: id,
      roleName: roleName,
      description: description,
      permissions: permissions,
    });
    dispatch(setIsVisible(true));
  };

  const cardVariants: Variants = {
    offscreen: {
      y: 100
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const roleList = useSelector((state: any) => state.role.roleList);

  // calling api's 
  const handleDeleteRole = (id:number) => {
    api.delete(`/roles/${id}`).then(() => {
      const updatedRoleList = roleList.filter((role: { id: number }) => role.id !== id);
      dispatch(setRole(updatedRoleList));
      toast('Role deleted successfully');
    });
  };

  return (
    <motion.div
      className="bg-secondary w-[98%] rounded-lg hover:bg-gray-200 shadow-md border-md p-5"
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="flex justify-between text-3xl">
        <div className="flex">
          <AdminPanelSettingsIcon style={{ fontSize: "50px" }} />
          <h2>{roleName}</h2>
        </div>
        <EditIcon
          onClick={() => handleEdit()}
          style={{ fontSize: "30px", cursor: "pointer", fill: "#038ff7" }}
        />
      </div>
      <p className="text-gray-500">
        {description.length > 50
          ? `${description.substring(0, 50)}...`
          : description}
      </p>
      <p className="mt-3 font-medium">Permissions:</p>
      <ul className="flex gap-3 pt-2">
        {permissions.map((permission) => (
          <PermissionBadge key={permission} permission={permission} />
        ))}
      </ul>
      <div className="flex justify-end">
        <DeleteIcon
          onClick={() => {
            handleDeleteRole(id);
          }}
          style={{ fontSize: "30px", fill: "#dc2626", cursor: "pointer" }}
        />
      </div>
    </motion.div>
  );
};

export default Role;
