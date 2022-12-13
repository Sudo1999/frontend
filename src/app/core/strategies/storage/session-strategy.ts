import { IStorageStrategy } from "./i-storage-strategy";

export class SessionStrategy implements IStorageStrategy{
    getItem(key: string) {
        //throw new Error("Method not implemented.");
        return sessionStorage.getItem(key);
    }
    storeItem(key: string, item: string): void {
        //throw new Error("Method not implemented.");
        sessionStorage.setItem(key, item);
    }
    removeItem(key: string): void {
        //throw new Error("Method not implemented.");
        sessionStorage.removeItem(key);
    }
}
