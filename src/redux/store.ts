
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './services/cartSlice'
import { persistReducer } from 'redux-persist'
import storage from './storage'


const persistOptions = {
  key: "cart",
  storage
}

const persistedCartReducer = persistReducer(persistOptions, cartReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
        cart: persistedCartReducer
    },
    middleware: (GetDefaultMiddleware) => {
      return GetDefaultMiddleware({
        serializableCheck: false
      })
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];