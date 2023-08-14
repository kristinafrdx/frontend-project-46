import path from 'path';
import fs from 'fs';
import process from 'process';
import buildTree from './buildTree.js';
import getParserFile from './parsers.js';
import getFormatDiff from './__formatters__/index.js';

const getDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  const pathToFile1 = path.resolve(process.cwd(), filepath1); // get absolute path
  const pathToFile2 = path.resolve(process.cwd(), filepath2);

  const readFile1 = fs.readFileSync(pathToFile1, 'utf-8'); // reading files
  const readFile2 = fs.readFileSync(pathToFile2, 'utf-8');

  const object1 = getParserFile(readFile1, format1); // parsing files to regular objects
  const object2 = getParserFile(readFile2, format2);

  const tree = buildTree(object1, object2);
  return getFormatDiff(tree, formatName);
};

export default getDiff;
