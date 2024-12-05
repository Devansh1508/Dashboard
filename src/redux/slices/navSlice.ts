import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface activeState {
  active: number
}

const initialState: activeState = {
  active: 0,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
        state.active = action.payload
        },
  },
})

// Action creators are generated for each case reducer function
export const {setActive} = navSlice.actions

export default navSlice.reducer