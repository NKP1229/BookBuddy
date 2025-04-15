/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import { useReturnBooksMutation } from "./BookSlice";
import { useGetAccountDetailsQuery } from "./AccountSlice";
import { useGetReservationsQuery } from "./AccountSlice";
import { useNavigate } from "react-router-dom";
const Account = () => {
    const [user,setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const { status: status1, data: Account} = useGetAccountDetailsQuery();
    const { status: status2, data: reservedBooks, refetch: refresh2 } = useGetReservationsQuery();
    const [returnABook] = useReturnBooksMutation();
    const navigate = useNavigate();
    async function REfetch(){
        await refresh2();
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            REfetch();
        }
    }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            if (status1 === "fulfilled") {
                setUser(Account);
            }
        }
    }, [status1, Account]);

    useEffect(() => {
        // Update the books list when the reservation data is fetched
        const token = localStorage.getItem("token");
        if(token){
            if (status2 === "fulfilled") {
                setBooks(reservedBooks);
            }
        }
    }, [status2, reservedBooks]);

    // async function getList(){
    //     // fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
    //     //     method: 'GET',
    //     //     headers: {
    //     //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //     //     }
    //     // })
    //     //   .then((response) => {
    //     //     if (!response.ok) {
    //     //       throw new Error("Unauthorized or error fetching reservation details");
    //     //     }
    //     //     return response.json();
    //     //   })
    //     //   .then((data) => setBooks(data))
    //     //   .catch((error) => console.error("Error:", error));
    //     try{
    //         if(status2 === "fulfilled"){
    //             setBooks(reservedBooks);
    //         }
    //     }
    //     catch(error){
    //         console.error(error.message);
    //     }
    // }
    // function getUser(){
    //     try{
    //         if(status1 === "fulfilled"){
    //             setUser(Account);
    //         };
    //     }
    //     catch(error){
    //         console.error(error.message);
    //     }
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if(token){
    //         getUser();
    //         getList();
    //     }
    // }, [Account, reservedBooks])
    if(user === null){
        return (
            <>
                <div>Please log in to view your account</div>
            </>
        )
    }
    async function returnBook(ID){
        try{
            const updatedBooks = books.filter(book => book.id !== ID);
            setBooks(updatedBooks);
            await returnABook(ID).unwrap(); 
            await REfetch();
        }
        catch(error){
            console.error(error.message);
        }
    }
    function logOut(){
        localStorage.removeItem("token");
        setUser(null);
        navigate('/');
    }
    return(
        <div className="page">
            <div>
                <button className="LogOut" onClick={() => logOut()}>Log Out</button>
            </div>
            <div className="accountDetails">
                <div>
                    <h2>Account Details:</h2>
                </div>
                <div>
                    <p>First Name: {Account.firstname}</p>
                    <p>Last Name: {Account.lastname}</p>
                    <p>Email: {Account.email}</p>
                    <p>Id: {Account.id}</p>
                </div>
                <div>
                    <h2>Checked-out Books</h2>
                    {books.length === 0 ? 
                        (<p>You have no checked-out books</p>) : 
                        (<ul className="checkedOutBooks">
                            {books.map((book) => (
                                <li key={book.id}> {book.title} <button className="btn btn-secondary" onClick={() => returnBook(book.id)}>Return</button></li>
                            ))}
                        </ul>)
                    }
                </div>
            </div>
        </div>
    )
}
export default Account;