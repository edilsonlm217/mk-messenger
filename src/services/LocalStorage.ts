class LocalStorage {
    constructor() { }

    public setItem(keyName: string, keyValue: string): void {
        window.localStorage.setItem(keyName, keyValue);
    }

    public getItem(keyName: string): string | null {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem(keyName);
        } else {
            return null;
        }
    }

    public removeItem(keyName: string): void {
        window.localStorage.removeItem(keyName);
    }

    public sessionNameExists(): boolean {
        return this.getItem("client-session-name") ? true : false;
    }

    public clear(): void {
        window.localStorage.clear();
    }
}

export default new LocalStorage();