import stylish from './stylish.js'

const formatDiff = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    // case '.json':
    //   return ;
    // case 'plain':
    //   return ;
    default:
      throw new Error ('Invalid format')
  }
};

export default formatDiff;
