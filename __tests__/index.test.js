import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь файла
const expectFile = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8'); // ожидаемый результат

test('genDiff.json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expectFile);
});

test('gendiff.yml', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(expectFile);
});
