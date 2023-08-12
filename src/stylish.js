import _ from 'lodash';

const doubleIndent = '  ';
const getIndent = (depth, spacecount = 4) => {
  const replaser = ' ';
  const spases = replaser.repeat(depth * spacecount - 2); // 2 знака на +-
  return spases;
};

const stringify = (noda, depth = 1) => {
  if (!_.isObject(noda)) {
    return `${noda}`;
  }
  const obj = Object.entries(noda);
  const result = obj.map(([key, value]) => `${getIndent(depth + 1)}${doubleIndent}${key}: ${stringify(value, depth + 1)}`).join('\n');
  return `{\n${result}\n${getIndent(depth)}${doubleIndent}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const res = node.map((elem) => {
      const { key, value, type } = elem;
      if (type === 'added') {
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      if (type === 'deleted') {
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      if (type === 'changed') {
        return `${getIndent(depth)}- ${key}: ${stringify(elem.value1, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(elem.value2, depth)}`;
      }
      if (type === 'unchanged') {
        return `${getIndent(depth)}${doubleIndent}${key}: ${stringify(value, depth)}`;
      }
      if (type === 'nested') {
        return `${getIndent(depth)}${doubleIndent}${key}: {\n${iter(elem.children, depth + 1)}\n${getIndent(depth)}${doubleIndent}}`;
      }
    });
    return `${res.join('\n')}`;
  };
  return `{\n${iter(tree, 1)}\n}`;
}
export default stylish;
