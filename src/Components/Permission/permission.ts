export type Permission = 'read' | 'create' | 'update' | 'delete' | 'admin';

export interface UserPermission {
  id: number;
  name: string;
  role: string;
  date: string;
  active: boolean;
}

export interface PermissionModalProps {
  user: UserPermission | null;
  setIsPermissionModalOpen: (value: boolean) => void;
}