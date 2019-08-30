// regular 使用方法合集
/**
 * 根据名字返回正则
 * @param {Array} array 正则数组
 * @param {String} name 搜索的名称
 */
export const dealRegularSearch = (array, name) => {
    if (!name) {
        return array;
    }
    return array.filter(item => item.name.indexOf(name) > -1);
};
