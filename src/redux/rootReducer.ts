import { combineReducers } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice';
import formSliceReducer from './slices/formSlice';
import roleSliceReducer from './slices/roleSlice';
import userSliceReducer from './slices/userSlice';

const rootReducer = combineReducers({
    nav: navReducer,
    form: formSliceReducer,
    role: roleSliceReducer,
    user: userSliceReducer
});

export default rootReducer;