import axios, { AxiosInstance } from "axios";
import { ChartDTO, Identity } from "../dto";
import IdentityService from "./IdentityService";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8090", 
    timeout: 1000
});

export const getAvatarUrl = (userId: string) => {    
    return api.defaults.baseURL + `/users/${userId}/image?${Date.now()}`;
};

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    (error) => {       
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.code === "ECONNABORTED") { 
            alert("Please check server");
            return Promise.reject(error);
        } 

        if (error.code === "ERR_NETWORK")
            return Promise.reject(error);

        
        if (error.response.status === 401) {
            let token = getToken();    
            if (!token) {
                IdentityService.clear();
                window.location.href = "/login";
                return;
            }

            token = await refreshToken();
            setToken(token);
           // localStorage.setItem('authToken', newToken);
            // Retry the original request
            return axios(error.config);
        }
        return Promise.reject(error);
    }
);

export const login = async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    const token = response.data;
    setToken(token);
    await IdentityService.Refresh(await getIdentity())
    return response.data;
};

export const logout = () => {
    sessionStorage.removeItem("access_token");
    IdentityService.clear();
};

const refreshToken = async () => {
    const response = await api.post("/refresh", { refreshToken: getToken().refreshToken });
    return response.data;
};

export const isAuthenticated = () => {
    return getToken() != null;
};

export const register = async (email: string, password: string) => {
    const response = await api.post("/register", { email, password });                
    return response;
};


const getToken = () => {
    const json = sessionStorage.getItem("access_token");
    return json == null ? null : JSON.parse(json);
}

const setToken = (token: any) => {
    sessionStorage.setItem("access_token", JSON.stringify(token));    
}



export const getUsers = async () => {   
    const response = await api.get("/users");       
    return response.data;    
};

export const getUser = async (id?: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const getIdentity = async () => {
    const response = await api.get<Identity>(`/users/identity`);
    return response.data;
}

export const updateUserRole = async (userId: string, role: string, action:boolean) => {
    const response = await api.post(`/users/${userId}/roles`, {role, action});
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response;
};

export const updateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/users/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
};


export const getRoles = async () => {
    const response = await api.get(`/roles`);
    return response.data;
};

export const getTemperatures = async (year?: number): Promise<ChartDTO> => {
    const response = await api.get<ChartDTO>(`/TemperatureHistory/${(year == undefined ? '' : year)}`);
    return response.data;
};