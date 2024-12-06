import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import userData from '../../Components/Permission/userData';

interface User {
    id: number;
    name: string;
    role: string;
    date: string;
    active: boolean;
}

interface UserState {
    userData: User[];
}

const initialState: UserState = {
    userData: userData,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<User[]>) {
            state.userData = action.payload;
        },
        clearUserData(state) {
            state.userData = [];
        },
        addUserData(state, action: PayloadAction<User>) {
            state.userData.push(action.payload);
        },
        updateUserData(state, action: PayloadAction<User>) {
            const index = state.userData.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.userData[index] = { ...state.userData[index], ...action.payload };
            }
        },
        deleteUserData(state, action: PayloadAction<{ id: number }>) {
            state.userData = state.userData.filter(user => user.id !== action.payload.id);
        }
    },
});

export const { setUserData, clearUserData, addUserData, updateUserData, deleteUserData } = userSlice.actions;

export default userSlice.reducer;
