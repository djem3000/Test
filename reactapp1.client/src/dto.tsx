export interface User {
    id: string;
    name: string;
    roles: string[];    
    logins: number;
    lastLogin: string;
}


export interface Identity {
    id: string;
    name: string;
    roles: string[];    
}