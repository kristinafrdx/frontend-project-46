import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const getUnionKeys = _.sortBy(_.union(_.keys(obj2), _.keys(obj1)));
  const result = [];

  getUnionKeys.forEach((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) { // если ключи есть в обоих файлах
      if (obj1[key] === obj2[key]) {
        result.push(`    ${key}: ${obj1[key]}\n`);
      } else { // ключи равны - значения нет // и значения не равны
        result.push(`  - ${key}: ${obj1[key]}\n`);
        result.push(`  + ${key}: ${obj2[key]}\n`); // добавляем в результирующий массив
      }
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) { // ключ есть в первом и нет во втором
      result.push(`  - ${key}: ${obj1[key]}\n`);
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) { // ключ есть во втором и нет в первом
      result.push(`  + ${key}: ${obj2[key]}\n`);
    }
  });
  const res = result.join('');
  return `{\n${res}}`;
};

export default buildTree;
