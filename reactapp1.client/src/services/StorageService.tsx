class StorageService {    

    constructor() {        
    }

    public setValue = (key: string, value: unknown) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public getValue = (key: string) => {
        const json = sessionStorage.getItem(key);
        return json == null ? null : JSON.parse(json);
    }

    public remove = (key: string) => {
        sessionStorage.removeItem(key);
    };
}

export default new StorageService();