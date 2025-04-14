import React, { useState } from 'react'
import bookLogo from './assets/books.png'
import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store"
import Navigations from './components/Navigations';
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";


function App() {
  const [token, setToken] = useState(null)

  return (
    <Provider store={store}>
      <header>
        <h1><img id='logo-image' src={bookLogo}/>Exclusive Library App</h1>
      </header>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
