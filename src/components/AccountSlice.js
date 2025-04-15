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
            invalidatesTags: ["Users"],
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
            invalidatesTags: ["Users"],
        }),
        getAccountDetails: build.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }),
            providesTags: ["Users"],
        }),
        getReservations: build.query({
            query: () => ({
                url: "/reservations",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }),
            providesTags: ["Users"],
        }),
    })
});

export const {
    useAddAccountMutation,
    useLoginAccountMutation,
    useGetAccountDetailsQuery,
    useGetReservationsQuery,
} = accountApi;