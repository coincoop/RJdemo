/* eslint no-use-before-define: 0 */

import {createSlice} from '@reduxjs/toolkit'

interface CartState{
    _id: string
}

const initialState: CartState ={
    _id: '',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: initialState
    },
    reducers: {
        addCart: (state, action)=>{
            state.cartData= action.payload
        },
        removeCart: (state)=>{
            state.cartData= initialState
        }
    }
})

export const cartReducer = cartSlice.reducer
export const {addCart, removeCart} = cartSlice.actions
export const cartSelector = (state: any) => state.cartReducer.cartData