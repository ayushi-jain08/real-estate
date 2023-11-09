import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Slice/UserSlice'
import ListingSlice from './Slice/ListingSlice'

export const store = configureStore({
  reducer: {
    user:UserSlice,
    listing: ListingSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})