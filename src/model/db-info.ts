export interface DatabaseObjInfo {
    objName: string;
    definition: string;
    type: string;
}

export interface DatabaseDiffInfo {
    objName: string;
    type: string;
    message: string;
    definition?: { source: string, target: string };
}

export interface TableInfo {
    tableName: string;
    columns: string;
    whereSql?: string;
}