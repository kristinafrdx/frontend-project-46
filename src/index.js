import path from 'path';
import fs from 'fs';
import process from 'process';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1); // узнаем абсолютный путь до файлов
  const path2 = path.resolve(process.cwd(), filepath2);

  const readFile1 = fs.readFileSync(path1, 'utf-8'); // читаем файлы
  const readFile2 = fs.readFileSync(path2, 'utf-8');

  const object1 = JSON.parse(readFile1); // парсим файлы в обычные объекты
  const object2 = JSON.parse(readFile2);
  const getResult = buildTree(object1, object2);
  return getResult;
};

export default genDiff;