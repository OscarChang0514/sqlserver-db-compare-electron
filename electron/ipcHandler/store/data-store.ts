
const Store = require("electron-store");
const store = new Store();

export const getStorageData = async (e: Electron.IpcMainInvokeEvent, key?: string) => {
    return store.get(key);
};

export const setStorageData = async (e: Electron.IpcMainInvokeEvent, key?: string, value?: any) => {
    store.set(key, value);
};