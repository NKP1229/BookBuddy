/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import { useReturnBooksMutation } from "./BookSlice";
import { useGetAccountDetailsQuery } from "./AccountSlice";
import { useNavigate } from "react-router-dom";
const Account = () => {
    const [user,setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const { status: status1, data: Account } = useGetAccountDetailsQuery();
    const [returnABook] = useReturnBooksMutation();
    const navigate = useNavigate();
    function getList(){
        fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Unauthorized or error fetching reservation details");
            }
            return response.json();
          })
          .then((data) => setBooks(data))
          .catch((error) => console.error("Error:", error));
    }
    function getUser(){
        try{
            if(status1 === "fulfilled"){
                setUser(Account);
            };
        }
        catch(error){
            console.error(error.message);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            getUser();
            
            getList();
        }
    }, [status1])
    if(!user){
        return (
            <>
                <div>Please log in to view your account</div>
            </>
        )
    }
    async function returnBook(ID){
        try{
            await returnABook(ID).unwrap();  
            getList();
        }
        catch(error){
            console.error(error.message);
        }
    }
    function logOut(){
        localStorage.removeItem("token");
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
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Email: {user.email}</p>
                    <p>Id: {user.id}</p>
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