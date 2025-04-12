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
      deleteBooks: build.mutation({
        query: (bookId) => ({
            url: `/books/${bookId}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Books"],
      }),
      addBook: build.mutation({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: "POST",
          body: {title, author, description }
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
    useAddBookMutation,
   useDeleteBookMutation,
} = bookApi;

