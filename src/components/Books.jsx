/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useAddBookMutation, useGetBooksQuery } from "./BookSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Books(){
    const [addBook] = useAddBookMutation();
    const { status, isLoading, data: bookList } = useGetBooksQuery();
    return(
        <article>
            <h2>Available books...</h2>
            <ul className="myBooks">
                {isLoading && <li>Loading books...</li>}
                {bookList?.map((p) => (
                <li key={p.id}>
                    <Link to={`/books/${p.id}`}>
                        <h4>
                            {p.title} #{p.id}
                        </h4>
                    </Link>
                    <figure>
                        <img src={p.coverimage} alt={p.title} />
                    </figure>
                    {/* <button onClick={() => navigate(viewBook)}>
                    See details
                    </button> */}
                </li>
                ))}
            </ul>
            
        </article>
    )
}
