/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { useGetBooksQuery } from "./BookSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
export default function Books(){
    const { status, isLoading, data: bookList } = useGetBooksQuery();
    const [books, setListOfBooks] = useState([]);
    const [searched, setSearched] = useState('');
    const availBooks = books.filter(p => p.available);
    const handleChange = (e) => {
        setSearched(e.target.value);
    };
    const searchedBooks = availBooks.filter(book =>
        book.title.toLowerCase().startsWith(searched.toLowerCase())
    );
    useEffect(() => {
        if (status === "fulfilled") {
          setListOfBooks(bookList);
        }
      }, [status]);
      
    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="search-container">
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            placeholder="Search Book Name..."
                            value={searched}
                            onChange={handleChange}
                        />
                        <i className="fas fa-search search-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <article>
                <h2 className="title">Available books...</h2>
                <ul className="myBooks">
                    {isLoading && <li>Loading books...</li>}
                    {searchedBooks.map((p) => (
                        <li key={p.id}>
                            <Link to={`/books/${p.id}`}>
                                <h4 className="title">
                                    {p.title} #{p.id}
                                </h4>
                            </Link>
                            <figure>
                                <img src={p.coverimage} alt={p.title} />
                            </figure>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    )
}
