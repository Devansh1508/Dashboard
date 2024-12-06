import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { roles } from '../../data/roleListData';

interface Role {
  id: number;
  roleName: string;
  description: string;
  permissions: string[];
}

interface RoleState {
  roleList: Role[];
}

const initialState: RoleState = {
  roleList: roles,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role[]>) => {
      if (Array.isArray(action.payload)) {
        state.roleList.push(...action.payload);
      } else {
        console.error('Payload is not an array:', action.payload);
      }
    },
    addRole: (state, action: PayloadAction<Role>) => {
      state.roleList.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roleList.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.roleList[index] = action.payload;
      }
    },
    deleteRole: (state, action: PayloadAction<number>) => {
      state.roleList = state.roleList.filter(role => role.id !== action.payload);
    },
  },
});

export const { setRole, addRole, updateRole, deleteRole } = roleSlice.actions;
export default roleSlice.reducer;