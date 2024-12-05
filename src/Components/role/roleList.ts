export const roles = [
  {
    id: 0,
    roleName: 'Admin',
    description: 'Person has all access',
    permissions: ['admin']
  },
  {
    id: 1,
    roleName: 'Editor',
    description: 'Person can read, create, and update content',
    permissions: ['read', 'create', 'update']
  },
  {
    id: 2,
    roleName: 'Viewer',
    description: 'Person can only read content',
    permissions: ['read']
  },
  {
    id: 3,
    roleName: 'Contributor',
    description: 'Person can create content but cannot update or delete',
    permissions: ['create']
  },
  {
    id: 4,
    roleName: 'Moderator',
    description: 'Person can read, update, and delete inappropriate content',
    permissions: ['read', 'update', 'delete']
  }
];