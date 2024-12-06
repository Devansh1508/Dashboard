export type Permission = 'read' | 'create' | 'update' | 'delete' | 'admin';

export interface UserPermission {
  id: number;
  name: string;
  role: string;
  permissions: Permission[];
  date: string;
}

export interface PermissionModalProps {
  isOpen: boolean;
  user: UserPermission | null;
  onSave: (id: number, permissions: Permission[]) => void;
}