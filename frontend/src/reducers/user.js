import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "utils/utils";

const initialState = getInitialState();

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setId: (store, action) => {
            store.id = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
        setEmail: (store, action) => {
            store.email = action.payload;
        },
        setName: (store, action) => {
            store.name = action.payload;
        },
        setAge: (store, action) => {
            store.age = action.payload;
        },
        setPresentation: (store, action) => {
            store.presentation = action.payload;
        },
        setFacebook: (store, action) => {
            store.facebook = action.payload;
        },
        setInstagram: (store, action) => {
            store.instagram = action.payload;
        },
    }
});

export default user;