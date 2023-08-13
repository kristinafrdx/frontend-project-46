import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'node:fs';
import { expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь файла

const expectFileStylish = fs.readFileSync(getFixturePath('expectStylish.txt'), 'utf-8'); // ожидаемый результат
const expectFilePlain = fs.readFileSync(getFixturePath('expectPlain.txt'), 'utf-8');

test('genDiff.json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expectFileStylish);
});

test('gendiff.yaml', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(expectFileStylish);
});

test('gendiff.plain', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json', 'plain')).toBe(expectFilePlain);
});
