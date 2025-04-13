import api from "../app/api"
// import { createSlice } from "@reduxjs/toolkit"
const accountApi = api.injectEndpoints({
    endpoints: (build) => ({
        addAccount: build.mutation({
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
        loginAccount: build.mutation({
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
// const storeToken = (action) => {
//     localStorage.setItem("token", action.payload.token);
//     console.log("Token stored:", action.payload.token);
// }
// const addUserSlice = createSlice({
//     name: "loginAccount",
//     initialState: {},
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addMatcher(accountApi.endpoints.addAccount.matchFulfilled, storeToken);
//         builder.addMatcher(accountApi.endpoints.loginAccount.matchFulfilled, storeToken);
//     },
// });
// export default addUserSlice.reducer;

export const {
    useAddAccountMutation,
    useLoginAccountMutation,
} = accountApi;