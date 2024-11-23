/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';

import Home from "./home";
import Profile from "./profile";
import Login from "./login";
import Logout from "./logout";
import IdentityService from "./services/IdentityService"

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    function handleIdentityChange(): void {
        setIsAuth(IdentityService.isAuthenticated());
    }    

    useEffect(() => {          
        IdentityService.onChangedAdd(handleIdentityChange);
        return () => {
            IdentityService.onChangedRemove(handleIdentityChange);
        }  
    }, []);  

    return (
        <Router>
            {isAuth &&
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </nav>
            }
            <Routes>
                <Route path="/"  element={<Home/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />                
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;
