import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';

import Home from "./home";
import About from "./about";
import Login from "./login";
import Logout from "./logout";
import { isAuthenticated } from "./ApiService"

function App() {
    

    useEffect(() => {    
    }, []);  

    return (
        <Router>
            {isAuthenticated() ?
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </nav>
            : ""}
            <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;