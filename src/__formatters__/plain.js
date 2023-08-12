import _ from 'lodash';

const getValue = (tree) => {
  if (_.isObject(tree)) {
     return '[complex value]'
  }
  if (_.isString(tree)) {
    return `${tree}`
  }
  return String(value)
}

const plain = (tree, path = '') => {
  const result = tree.map(({ type, key, value, value1, value2 }) => {
    switch (type) {
      case 'added': {
        return `Property ${path}${key} was added with value: ${getValue(value)}`;
      }
      case 'deleted': {
        return `Property ${path}${key} was removed`;
      }
      case 'changed': {
        return `Property ${path}${key} was updated. From ${getValue(value1)} to ${getValue(value2)}`;
      }
      case 'nested': {
        return plain(value, `${path}${key}`);
      }
      default:
        return [];
    }
  })
  return result.join('\n');
}

export default plain;