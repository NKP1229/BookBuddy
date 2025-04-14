import api from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const bookApi = api.injectEndpoints({
    endpoints: (build) => ({
      getBook: build.query({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: "GET",
        }),
        providesTags: ["Books"],
      }),
      getBooks: build.query({
        query: () => ({
          url: `/books`,
          method: "GET",
        }),
        providesTags: ["Books"],
      }),
      returnBooks: build.mutation({
        query: (Id) => ({
            url: `/reservations/${Id}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: {Id},
        }),
        invalidatesTags: ["Books"],
      }),
      reserveBook: build.mutation({
        query: ({bookId}) => ({
          url: `/reservations`,
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: {bookId},
        }),
        invalidatesTags: ["Books"],
      })
    })
});

const storeToken = (state, { payload }) => {
    localStorage.setItem("token", payload.token);
};
  
const bookSlice = createSlice({
    name: "book",
    initialState: {},
    reducers: {},
    extraReducers: (build) => {
      if (api.endpoints?.AddBook?.matchFulfilled) build.addMatcher(api.endpoints.books.matchFulfilled, storeToken);
    },
});
export default bookSlice.reducer;
  
export const {
    useGetBookQuery,
    useGetBooksQuery,
    useReserveBookMutation,
    useReturnBooksMutation,
} = bookApi;

