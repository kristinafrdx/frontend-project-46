import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (tree, path = '') => {
  const result = tree.flatMap((elem) => {
    switch (elem.type) {
      case 'added': {
        return `Property '${path}${elem.key}' was added with value: ${getValue(elem.value)}`;
      }
      case 'deleted': {
        return `Property '${path}${elem.key}' was removed`;
      }
      case 'nested': {
        return makePlain(elem.children, `${path}${elem.key}.`); // here - saving path
      }
      case 'changed': {
        return `Property '${path}${elem.key}' was updated. From ${getValue(elem.value1)} to ${getValue(elem.value2)}`;
      }
      default: {
        return [];
      }
    }
  });
  return result.join('\n');
};

export default makePlain;
