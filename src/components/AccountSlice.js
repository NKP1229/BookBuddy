import api from "../app/api"
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

export const {
    useAddAccountMutation,
    useLoginAccountMutation,
} = accountApi;