import { Permission } from './permission';

interface PermissionBadgeProps {
  permission: Permission;
}

export function PermissionBadge({ permission }: PermissionBadgeProps) {
  return (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
      {permission}
    </span>
  );
}