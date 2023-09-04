import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter'
import accountSlice from './slices/account'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    account: accountSlice
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch