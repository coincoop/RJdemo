/* eslint no-use-before-define: 0 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState{
    id: string,
    email:string,
    accessToken: string,
    name: string,
}

const initialState:AuthState = {
    id: '',
    email: '',
    accessToken: '',
    name: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        authData: initialState
    },
    reducers:{
        // addAuth: (state, action)=>{
        //     state.authData.id = action.payload.id,
        //     state.authData.email = action.payload.email,
        //     state.authData.accessToken = action.payload.accessToken
        //     state.authData.name = action.payload.name
        // },
        addAuth: (state, action: PayloadAction<any>)=>{
            state.authData = action.payload

        },

        removeAuth:(state)=>{
            // state.authData = initialState
            state.authData.id = ''
            state.authData.email =''
            state.authData.accessToken= ''
            state.authData.name=''
        },
    },
})

export const authReducer = authSlice.reducer
export const {addAuth, removeAuth} = authSlice.actions

export const authSelector = (state: any ) => state.authReducer.authData