import { Identity } from "../dto";
import StorageService from "./StorageService" 

type EventHandler = (args?: Identity) => void;

class IdentityService {
    public Identity?: Identity = undefined;
    private readonly key: string = "identity";

    constructor() {         
        this.Identity = StorageService.getValue(this.key);
    } 

    public isAuthenticated = () => {
        return this.Identity != null;
    };

    public isInRole(role: string) {
        if (this.Identity != null) {
            return this.Identity.roles.includes(role);
        }

        return false;
    }

    public async Refresh(identity: Identity) {
        StorageService.setValue(this.key, identity);
        this.Identity = identity;
        this.emit(this.Identity);
    }

    public clear() {
        StorageService.remove(this.key);
        this.emit(this.Identity);
    }

    private listeners: EventHandler[] = [];
    
    public onChangedAdd(handler: EventHandler) {       
        this.listeners.push(handler);
    }

    public onChangedRemove(handler: EventHandler) {
        this.listeners = this.listeners.filter(h => h !== handler);
    }

    private emit(identity?: Identity): void {        
        this.listeners.forEach(handler => handler(identity));
    }
}

export default new IdentityService()
