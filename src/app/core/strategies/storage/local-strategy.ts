import { IStorageStrategy } from "./i-storage-strategy";

export class LocalStrategy implements IStorageStrategy {
    getItem(key: string) {
        //throw new Error("Method not implemented.");
        return localStorage.getItem(key);
    }
    storeItem(key: string, item: string): void {
        //throw new Error("Method not implemented.");
        localStorage.setItem(key, item);
    }
    removeItem(key: string): void {
        //throw new Error("Method not implemented.");
        localStorage.removeItem(key);
    }
}
