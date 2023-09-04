"use client"
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserDetails = createAsyncThunk("fetchUserDetails", async (email: string) => {
    // const user  = await axios({
    //     method:"put",
    //     url: "http://localhost:8000/api/v1/user-details",
    //     data: {
    //         email
    //     }
    // })

    const query = gql`
        query Query($email: String!) {
            fetchUserDetailsWithEmail(email: $email) {
                _id
                name
                email
                username
                profileImageUrl
                bio
                blue
                createdAt
                updatedAt
                token
            }
        }
    `

    console.log(email)
    const {data} = useSuspenseQuery(query, {
        variables:{
            email
        }
    })
    console.log(data)
    return data
})


interface accountState {
    loading: boolean
    data: any
}


export const accountSlice = createSlice({
    initialState: {
        loading: false,
        data: null
    } as accountState,

    name: "accountDetails",

    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(fetchUserDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(fetchUserDetails.rejected, (state, action)=> {
            state.loading = false
            console.log(action.payload)
        })
    },
    reducers: {
        turnNull: (state) => {
            state.data = null;
        }
    },
})

export const { turnNull } = accountSlice.actions;
export default accountSlice.reducer