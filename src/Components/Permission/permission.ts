export type Permission = 'read' | 'create' | 'update' | 'delete' | 'admin';

export interface UserPermission {
  id: number;
  name: string;
  role: string;
  date: string;
  active: boolean;
}

export interface PermissionModalProps {
  isOpen: boolean;
  user: UserPermission | null;
  onSave: (id: number, permissions: Permission[]) => void;
}