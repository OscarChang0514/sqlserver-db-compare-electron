import { DatabaseDiffInfo, DatabaseObjInfo } from "../model/db-info";

export const compareDbDiff = (source: DatabaseObjInfo[], target: DatabaseObjInfo[], options: { [key: string]: boolean }) => {

    let result: DatabaseDiffInfo[] = [];

    result = [
        // 找出target DB 沒有的物件
        ...source.filter(item => {
            return !target.find(({ objName, type }) => item.objName === objName && item.type === type)
        }).map(item => (
            {
                objName: item.objName,
                type: item.type,
                message: 'Target 無該物件',
                definition: { source: item.definition }
            }
        )),
        // 找出source DB 沒有的物件
        ...target.filter(item => {
            return !source.find(({ objName, type }) => item.objName === objName && item.type === type)
        }).map(item => (
            {
                objName: item.objName,
                type: item.type,
                message: 'Source 無該物件',
                definition: { target: item.definition }
            }
        )),
        // 找出都有但兩者內容不同的物件
        ...target.reduce((sum, item) => {
            let sourDbItem = source.find(sourItem => (
                item.objName === sourItem.objName && item.type === sourItem.type
            ));
            let sourDefinition = sourDbItem ? getCleanDefinition(sourDbItem) : '';
            let tarDefinition = getCleanDefinition(item);
            if (sourDbItem && getCompareStr(sourDefinition, options) !== getCompareStr(tarDefinition, options)) {
                return [...sum, {
                    objName: item.objName,
                    type: item.type,
                    message: '內容不同',
                    definition: { target: tarDefinition, source: sourDefinition }
                }]
            }
            return sum
        }, []),
    ]

    return result;
}

const getCleanDefinition = (data: DatabaseObjInfo) => {

    let sourIndex = data.definition.indexOf(" AS");
    if (sourIndex < 0) {
        sourIndex = data.definition.indexOf(" as")
    }
    if (sourIndex > 0) {
        sourIndex += 3;
    }

    return data.definition.substring(sourIndex).trim();
}

const getCompareStr = (definition: string, options: { [key: string]: any }) => {
    const { caseSensitive, compareSpace } = options;
    let str = definition ?? '';
    if (!caseSensitive) {
        str = str.toUpperCase()
    }
    if (!compareSpace) {
        str = str.replace(/\s/g, "")
    }
    return str;
}