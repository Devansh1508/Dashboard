import { combineReducers } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice';
import formSliceReducer from './slices/formSlice';

const rootReducer = combineReducers({
    nav: navReducer,
    form: formSliceReducer
});

export default rootReducer;