import React from 'react'
import { Link } from "react-router-dom"
export default function Nav() {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
            </div>
            <div className="container-fluid">
                <Link to="/login" className="navbar-brand">Login</Link>
            </div>
            <div className="container-fluid">
                <Link to="/register" className="navbar-brand">Register</Link>
            </div>
            <div className="container-fluid">
                <Link to="/account" className="navbar-brand">Account</Link>
            </div>
        </nav>
    )
}