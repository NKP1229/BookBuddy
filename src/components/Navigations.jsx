/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from 'react'
import { Link } from "react-router-dom"
export default function Navigations() {
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