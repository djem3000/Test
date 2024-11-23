/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from './services/ApiService';
import IdentityService from './services/IdentityService'
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (IdentityService.isAuthenticated())
            navigate('/');
    }, []);
  
    return (
          <div className="login-container">
            <h2>{isSignUp ? "Register" : "Login"}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isSignUp &&
                    <div>
                        <label>Re-Password:</label>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                }

                <button type="submit">Sign in</button>  
                
                <button type="button" onClick={()=>onSignUp()}>Sign up</button>
                {errors.map(error => <p className="error">{error}</p>)}                
            </form>
        </div>      
    );          

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            await login(email, password);               
            navigate('/');
        }
        catch (ex) {
            setErrors(["Invalid credentials"]);
        }
    }   

    async function onSignUp() {
        setErrors([]);
        if (!isSignUp) {
            setIsSignUp(true);
            return;
        }

        if (password != password2) { 
            setErrors(["Invalid password matching."]);
            return;
        }

        try {
            await register(email, password);
            alert("Registered")
            window.location.reload(); 
        }
        catch (ex: any) {
            const err = Object.values(ex.response.data.errors).reduce((accumulator, currentValue) => {
                return accumulator.concat(currentValue);
            }, []);;
            setErrors(err as string[]);
        }
    }
}



export default Login;