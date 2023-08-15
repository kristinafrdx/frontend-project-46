import _ from 'lodash';

const doubleIndent = '  ';
const getIndent = (depth, spacecount = 4) => {
  const replaser = ' ';
  const spaces = replaser.repeat(depth * spacecount - 2); // 2 sign for +-
  return spaces;
};
const stringify = (noda, depth = 1) => {
  if (!_.isObject(noda)) {
    return `${noda}`;
  }
  const obj = Object.entries(noda);
  const result = obj.map(([key, value]) => `${getIndent(depth + 1)}${doubleIndent}${key}: ${stringify(value, depth + 1)}`).join('\n');
  return `{\n${result}\n${getIndent(depth)}${doubleIndent}}`;
};
const makeStylish = (tree) => {
  const iter = (node, depth = 1) => {
    const res = node.map(({
      key, value, type, value1, value2, children,
    }) => {
      switch (type) {
        case 'added': {
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        } case 'deleted': {
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        } case 'changed': {
          return `${getIndent(depth)}- ${key}: ${stringify(value1, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(value2, depth)}`;
        } case 'unchanged': {
          return `${getIndent(depth)}${doubleIndent}${key}: ${stringify(value, depth)}`;
        } case 'nested': {
          return `${getIndent(depth)}${doubleIndent}${key}: {\n${iter(children, depth + 1)}\n${getIndent(depth)}${doubleIndent}}`;
        } default: {
          return null;
        }
      }
    });
    return `${res.join('\n')}`;
  };
  return `{\n${iter(tree, 1)}\n}`;
};
export default makeStylish;
