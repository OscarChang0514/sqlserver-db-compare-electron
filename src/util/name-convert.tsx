// 下劃線轉換駝峰
export const toHump = (name: string) => {
  return name.split('_').reduce((sum, current, index) => {
    let firstWord = index === 0 ? current.charAt(0).toLowerCase() : current.charAt(0).toUpperCase()
    return sum + firstWord + current.slice(1).toLowerCase()
  }, '');
};

// 駝峰轉換下劃線
export const toLine = (name: string) => (
  name.replace(/([A-Z])/g, "_$1").toLowerCase()
);

// 駝峰轉換下劃線(全大寫)
export const toUpperLine = (name: string) => {
  var res = name.replace(/([A-Z])/g, "_$1");
  return res.charAt(0).toUpperCase() + res.slice(1);
};
