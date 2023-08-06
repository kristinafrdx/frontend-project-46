import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь файла
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8') // читаем файл

const expectFile = fs.readFileSync(getFixturePath('expected.txt', 'utf-8')); // ожидаемый результат

test('genDiff', () => {
  const data1 = getFixturePath('file1.json');
  const data2 = getFixturePath('file2.json');
  expect(genDiff(data1, data2)).toBe(expectFile);
});
