import _ from 'lodash';

const buildTree = (file1, file2) => {
  const getUnionKeys = _.sortBy(_.union(_.keys(file2), _.keys(file1)));

  return getUnionKeys.map((key) => {
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: buildTree(file1[key], file2[key]), type: 'nested' };
    }
    if (file1[key] === file2[key]) {
      return { key, value: file1[key], type: 'unchanged' };
    }

    if (file1[key] !== file2[key]) {
      return {
        key,
        value1: file1[key],
        value2: file2[key],
        type: 'changed',
      };
    }
  });
};
export default buildTree;
