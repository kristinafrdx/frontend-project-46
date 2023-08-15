import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const makePlain = (tree, path = '') => {
  const result = tree.flatMap(({
    type, key, value, children, value1, value2,
  }) => {
    switch (type) {
      case 'added': {
        return `Property '${path}${key}' was added with value: ${getValue(value)}`;
      }
      case 'deleted': {
        return `Property '${path}${key}' was removed`;
      }
      case 'nested': {
        return makePlain(children, `${path}${key}.`); // here - saving path
      }
      case 'changed': {
        return `Property '${path}${key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
      }
      default: {
        return [];
      }
    }
  });
  return result.join('\n');
};

export default makePlain;
