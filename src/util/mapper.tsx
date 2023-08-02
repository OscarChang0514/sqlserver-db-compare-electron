import { toHump, toLine, toUpperLine } from "./name-convert";

/**
 * 將後端傳回來的下劃線參數轉為駝峰
 */
export const mapToModel = <T extends { [key: string]: any }>(obj: any) => {
    var result = {} as T;
    obj && Object.keys(obj).forEach(key => {
        result = { ...result, [toHump(key)]: obj[key] }
    })
    return result;
};

/**
 * 將後端傳回來的array下劃線參數轉為駝峰
 */
export const mapToModelList = <T extends { [key: string]: any }>(objList: any[]) => {
    return objList && objList.map(obj => mapToModel<T>(obj));
}

/**
 * 將object的駝峰轉為下劃線參數
 */
export const mapToSql = (obj: any, upperLine?: boolean) => {
    var result = {};
    obj && Object.keys(obj).forEach(key => {
        result = { ...result, [upperLine ? toUpperLine(key) : toLine(key)]: obj[key] }
    })

    return result;
};

/**
 * 將json的駝峰轉為下劃線參數，
 * 會自動判斷子階若為object或array，則往下轉換
 */
export const deepMapToSql = (obj: any, upperLine?: boolean) => {
    let result: any = null;
    if (Array.isArray(obj)) {
        result = obj.map((item: any) => deepMapToSql(item, upperLine))
    } else if (typeof obj === 'object' && obj !== null) {
        result = {}
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            if (typeof value === 'object' && value !== null) {
                value = deepMapToSql(value, upperLine);
            }
            result = { ...result, [upperLine ? toUpperLine(key) : toLine(key)]: value }
        })
    }
    return result ?? obj;
};

/**
 * 將objectArray的駝峰轉為下劃線參數
 */
export const mapToSqlList = (objList: any[], upperLine?: boolean) => {
    return objList.map(obj => mapToSql(obj, upperLine));
};

/**
 * 把array以n個為一組，輸出二維陣列
 */
export const spliceArrByNum = (array: any[], groupNum: number) => {
    let newArray = []
    for (let i = 0; i < array.length;) {
        newArray.push(array.slice(i, i += groupNum));
    }
    return newArray
};

/**
 * 將指定的arg內容放到queryParam中，用於送出dataService的query
 */
export const mapQueryParamArg = (searchArg: any, appendObject?: any) => {
    let { dataTable, dataSort, dataFilter, dataPage, dataPageSize,
        ...filteredArg } = searchArg;
    let appendFilter = Object.keys(appendObject ?? {}).map(key =>
        ({ field: key, value: appendObject[key], operator: 'eq' })
    )
    let filter = Array.isArray(dataFilter) ? { logic: 'and', filters: dataFilter } : dataFilter ?? null;
    return {
        ...filteredArg,
        queryParam: {
            dataFilter: { logic: 'and', filters: filter ? [filter, ...appendFilter] : appendFilter },
            dataTable: dataTable ?? null,
            dataSort: dataSort ?? null,
            dataPage: dataPage ?? null,
            dataPageSize: dataPageSize ?? null,
        }
    }
}