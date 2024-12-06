import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface isVisibleState {
  isVisible: boolean,
}

const initialState: isVisibleState = {
  isVisible: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setIsVisible: (state, action: PayloadAction<boolean>) => {
        state.isVisible = action.payload
        },
  },
})

// Action creators are generated for each case reducer function
export const {setIsVisible} = formSlice.actions

export default formSlice.reducer