class LocalStorage {
    constructor() { }

    public setItem(keyName: string, keyValue: string): void {
        window.localStorage.setItem(keyName, keyValue);
    }

    public getItem(keyName: string): string | null {
        return window.localStorage.getItem(keyName);
    }

    public removeItem(keyName: string) {
        window.localStorage.removeItem(keyName);
    }

    public sessionNameExists(): boolean {
        return this.getItem("client-session-name") ? true : false;
    }
}

export default new LocalStorage();