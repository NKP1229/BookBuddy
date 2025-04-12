/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useLoginAcountMutation } from "./AccountSlice";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ logIn ] = useLoginAcountMutation();
    const { isLoading, error} = useLoginAcountMutation();
    
    async function checkUser(event){
        event.preventDefault();
        try{
            console.log("email: ", email);
            console.log("password: ", password);
            const response = await logIn({email, password});
            console.log(response);
            // navigate('/account');
        }
        catch(error){
            console.error(error.message);
        }
    }

    return(
        <div className="form">
            <h1>Log In</h1>
            <form onSubmit={checkUser}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            {isLoading && <output>Checking Account Credentials...</output>}
            {error && <output>{error.message}</output>}
        </div>
    )
}