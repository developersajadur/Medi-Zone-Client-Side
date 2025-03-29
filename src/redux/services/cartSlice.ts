import { TCartProduct } from '@/types';
import { createSlice } from "@reduxjs/toolkit";

// Define the shipping address type
type TShippingAddress = {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
};

// Define the initial state type
type TInitialState = {
    products: TCartProduct[];
    shippingAddress: TShippingAddress;
};

// Initial state with default values
const initialState: TInitialState = {
    products: [],
    shippingAddress: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action) {
            const product = action.payload;
            const existingProduct = state.products.find((item) => item._id === product._id);
        
            if (existingProduct) {
                existingProduct.orderQuantity += 1;
            } else {
                state.products.push({ ...product, orderQuantity: 1 });
            }
        },
        removeProductFromCart(state, action) {
            const productId = action.payload;
            state.products = state.products.filter((item) => item._id !== productId);
        },
        updateProductQuantity(state, action) {
            const { productId, type } = action.payload;
            state.products = state.products.map((item) =>
                item._id === productId
                    ? {
                          ...item,
                          orderQuantity:
                              type === "increase"
                                  ? item.orderQuantity + 1
                                  : Math.max(1, item.orderQuantity - 1),
                      }
                    : item
            );
        },
        setShippingAddress(state, action) {
            state.shippingAddress = action.payload;
        },
        clearCart(state) {
            state.products = [];
        },
    },
});

export const { addProductToCart, removeProductFromCart, updateProductQuantity, setShippingAddress,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
