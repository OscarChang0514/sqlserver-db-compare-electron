export const getDbObjType = (definition: string) => {
    let str = "  " + definition.slice(0, 300).replace(/\s/g, "").toUpperCase();
    if (str.indexOf("CREATEPROCEDURE") > 0) {
        return "Procedure"
    }
    if (str.indexOf("CREATEFUNCTION") > 0) {
        return "Function"
    }
    if (str.indexOf("CREATEVIEW") > 0) {
        return "View"
    }
    return "Obj";
};

export const getTableInfo = (tableName: string, schema: any[]) => {

    let tableColumns = schema.filter(item => item.tableName === tableName);

    let tableInfo = '';
    tableColumns.forEach(tableColumn => {
        tableInfo += `${tableColumn.columnInfo}\n`;
    })

    return { tableName, tableInfo }
}