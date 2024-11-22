import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from './ApiService';

function Logout() {
    
    useEffect(() => {
        logout();
    }, []);
  
    return (
        <Navigate to='/login' />            
    );
}

export default Logout;