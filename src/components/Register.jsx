/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAcountMutation } from "./AccountSlice";

export default function Register(){
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ addUser ] = useAddAcountMutation();
    const { isLoading, error} = useAddAcountMutation();

    async function postUser(event){
        event.preventDefault();
        try{
            console.log("fname: ", fname);
            console.log("lname: ", lname);
            console.log("email: ", email);
            console.log("password: ", password);
            const response = await addUser({fname, lname, email, password});
            console.log(response);
            // navigate('/account');
        }
        catch(error){
            console.error(error.message);
        }
    }

    return(
        <div className="form">
            <h1>Register for free!</h1>
            <form onSubmit={postUser}>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>First name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="First name"
                                name="firstname"
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>Last name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Last name"
                                name="lastname"
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {isLoading && <output>Creating New Account...</output>}
            {error && <output>{error.message}</output>}
        </div>
    )
}