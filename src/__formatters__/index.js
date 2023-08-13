import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDiff = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'json':
      return json(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Invalid format');
  }
};

export default formatDiff;
