import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from './ApiService';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated())
            navigate('/');
    }, []);
  
    return (
          <div className="login-container">
            <h2>Login</h2>
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
                <button type="submit">submit</button>
                {error && <p className="error">{error}</p>}
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
            setError("Invalid credentials");
        }
    }   
}



export default Login;