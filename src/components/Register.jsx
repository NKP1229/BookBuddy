/* TODO - add your code to create a functional React component that renders a registration form */
export default function Register(){
    return(
        <div className="form">
            <h1>Register for free!</h1>
            <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name"/>
                        </div>
                        <div className="col">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name"/>
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