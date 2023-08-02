import { getDbObjType, getTableInfo } from "../util/get-db-info";

export const getDbSchemaInfo = async (e: Electron.IpcMainInvokeEvent, arg?: any) => {

    let connect: any = null;

    try {

        const sql = require('mssql');
        const body = arg ?? {}

        const sqlConfig = {
            server: body.host,
            database: body.databaseName,
            user: body.userName,
            password: body.pwd,
            options: {
                trustedConnection: true,
                encrypt: true,
                enableArithAbort: true,
                trustServerCertificate: true,
            }
        }

        connect = await sql.connect(sqlConfig);

        const objResult = await sql.query`
            SELECT distinct 
                object_name(OBJECT_ID) AS objName, 
                definition
            FROM sys.sql_modules
        `;

        const tableObjResult = await sql.query`
            SELECT 
            c.TABLE_NAME as tableName, 
            c.COLUMN_NAME as columnName, 
            CONCAT(
                c.COLUMN_NAME,
                '  ',c.DATA_TYPE, 
                '  Default:',c.COLUMN_DEFAULT,
                '  Nullable:',c.IS_NULLABLE, 
                '  LengthInfo:',c.CHARACTER_MAXIMUM_LENGTH, 
                '  ',c.CHARACTER_OCTET_LENGTH, 
                '  ',c.NUMERIC_PRECISION, 
                '  ',c.NUMERIC_PRECISION_RADIX, 
                '  ',c.NUMERIC_SCALE
            ) AS columnInfo
            FROM Information_Schema.Columns c  
            WHERE c.TABLE_NAME NOT LIKE 'vw_%'
            ORDER BY c.TABLE_NAME, c.COLUMN_NAME
        `;

        let tableObj = tableObjResult.recordset;

        let dbObj: any = [
            ...objResult.recordset.map((item: any) => (
                { ...item, type: getDbObjType(item.definition) }
            )),
            ...Array.from(new Set(tableObj.map((item: any) => item.tableName))).map((table: any) => {
                let info = getTableInfo(table, tableObj);
                return { objName: table, definition: info.tableInfo, type: "Table" }
            })
        ];

        if (connect?.connected) {
            await connect.close();
        }

        return { dbObj };

    } catch (err: any) {
        console.error(err);
        if (connect?.connected) {
            await connect.close();
        }
        return { message: err.message };
    }
};