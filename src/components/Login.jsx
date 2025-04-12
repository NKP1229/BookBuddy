/* TODO - add your code to create a functional React component that renders a login form */
export default function Login(){

    return(
        <div className="form">
            <h1>Log In</h1>
            <form>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}