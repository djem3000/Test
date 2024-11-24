/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';

import Home from "./home";
import Profile from "./profile";
import Login from "./login";
import Logout from "./logout";
import IdentityService from "./services/IdentityService"
import TemperatureChart from "./TemperatureChart"

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    function handleIdentityChange(): void {
        setIsAuth(IdentityService.isAuthenticated());
    }    

    useEffect(() => {          
        IdentityService.onChangedAdd(handleIdentityChange);
        setIsAuth(IdentityService.isAuthenticated());
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
                            <Link to="/profile" reloadDocument>My Profile</Link>
                        </li>
                        <li>
                            <Link to="/chart">Weather Chart</Link>
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
                <Route path="/chart" element={<TemperatureChart />} />
            </Routes>
        </Router>
    );
}

export default App;
