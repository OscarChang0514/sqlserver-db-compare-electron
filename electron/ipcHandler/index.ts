import { ipcMain } from "electron";
import { getDbDataInfo } from "./mssql/get-db-data";
import { getDbSchemaInfo } from "./mssql/get-db-schema";
import { getStorageData, setStorageData } from "./store/data-store";

export const initIpcMain = () => {
    ipcMain.handle('get-db-data', getDbDataInfo);
    ipcMain.handle('get-db-schema', getDbSchemaInfo);
    ipcMain.handle('get-storage-data', getStorageData);
    ipcMain.handle('set-storage-data', setStorageData);
};