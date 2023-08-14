import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const getFormatDiff = (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'json':
      return makeJson(tree);
    case 'plain':
      return makePlain(tree);
    default:
      throw new Error(`Format: '${format}' is't correct!`);
  }
};

export default getFormatDiff;
