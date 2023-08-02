
export const getDbDataInfo = async (e: Electron.IpcMainInvokeEvent, arg?: any) => {
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

    let connect: any = null;

    let tableInfos = body.tableInfos ?? [];

    let dbObj = [];
    try {
        const sql = require('mssql');
        connect = await sql.connect(sqlConfig);

        for (let i = 0; i < tableInfos.length; i++) {
            let tableInfo = body.tableInfos[i];
            if (tableInfo.tableName && tableInfo.columns) {
                let keys: string[] = tableInfo.columns?.split(',') ?? [];
                const dataResult = await sql.query(`
                    SELECT TOP 5000 ${tableInfo.columns}
                    FROM ${tableInfo.tableName}
                    ORDER BY ${tableInfo.columns}
                    ${tableInfo.whereSql ? "WHERE " + tableInfo.whereSql : ""}
                `);
                let definition = '';

                dataResult.recordset.forEach((item: any) => {
                    definition += keys.map(key => item[key]?.toString() ?? '').join(',') + `\n`
                })

                dbObj.push({ objName: tableInfo.tableName, definition, type: "Table" })
            }
        }

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