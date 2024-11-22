import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5270", 
    timeout: 1000
});

export const buildUrl = (url: string) => {    
    return api.defaults.baseURL + url;
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

        let token = getToken();
        if (error.response.status === 401 && token) {
            
            //if (!token) {
            //    window.location.href = "/login";
            //}
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
    //try {
        const response = await api.post("/login", { email, password });
        const token = response.data;
    setToken(token);
        return response.data;
    //} catch (error) {
    //    throw error;
    //}
};

const refreshToken = async () => {
  //  try {        
    const response = await api.post("/refresh", { refreshToken: getToken().refreshToken });         
        return response.data;
    //} catch (error) {
    //    throw error;
    //}
};

export const isAuthenticated = () => {
    return getToken() != null;
};


export const logout = () => {
    sessionStorage.removeItem("access_token"); 
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