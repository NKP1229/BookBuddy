import api from "../app/api"
import { createSlice } from "@reduxjs/toolkit"
const accountApi = api.injectEndpoints({
    endpoints: (build) => ({
        addAcount: build.mutation({
            query: ({firstname, lastname, email, password}) => ({
                url: "/users/register",
                method: "POST",
                body: {
                    firstname,
                    lastname,
                    email,
                    password,
                }
            }),
            invalidatesTags: ["Users"]
        }),
        loginAcount: build.mutation({
            query: ({email, password}) => ({
                url: "/users/login",
                method: "POST",
                body: {
                    email,
                    password,
                }
            }),
            invalidatesTags: ["Users"]
        }),
    })
});
//unsure if 'storeToken' & 'addUserSlice' is set up correctly
const storeToken = (state, {payload}) => {
    localStorage.setItem("token", payload.token);
}
const addUserSlice = createSlice({
    name: "addAccount",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        if(api.endpoints?.addAcount?.matchFulfilled){
            builder.addMatcher(api.endpoints.addAcount.matchFulfilled, storeToken);
        }
    },
});
export default addUserSlice.reducer;

export const {
    useAddAcountMutation,
    useLoginAcountMutation,
} = accountApi;