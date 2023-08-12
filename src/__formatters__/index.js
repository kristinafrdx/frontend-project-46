import stylish from './stylish.js';
import plain from './plain.js';

const formatDiff = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    // case '.json':
    //   return ;
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Invalid format');
  }
};

export default formatDiff;
