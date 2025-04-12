/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react"
const Account = () => {
    const [user,setUser] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/me")
          .then((response) => response.json())
          .then((data) => setUser(data));
        fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/me/books")
          .then((response) => response.json())
          .then((data) => setBooks(data))
    }, [])
    if(!user){
        return <div>Please log in to view your account</div>
    }
    return(
        <div>
            <h2>Account Details:</h2>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Id: {user.id}</p>
        </div>
    )
}
export default Account;