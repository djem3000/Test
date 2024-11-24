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

export interface ChartDTO {
    years: number[];
    year: number;
    data: CartTemperatureDTO[];    
}

export interface CartTemperatureDTO {
    mounth: string;
    temperature: number;
}