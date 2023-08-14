import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'node:fs';
import { expect } from '@jest/globals';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); // путь файла

const expectFileStylish = fs.readFileSync(getFixturePath('expectStylish.txt'), 'utf-8'); // ожидаемый результат
const expectFilePlain = fs.readFileSync(getFixturePath('expectPlain.txt'), 'utf-8');
const expectFileJson = fs.readFileSync(getFixturePath('expectJson.txt'), 'utf-8');

test('getDiff.json', () => {
  expect(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expectFileStylish);
});

test('getdiff.yaml', () => {
  expect(getDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(expectFileStylish);
});

test('getdiff.stylish', () => {
  expect(getDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json', 'stylish')).toBe(expectFileStylish);
});

test('gendiff.plain', () => {
  expect(getDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json', 'plain')).toBe(expectFilePlain);
});

test('gendiff.json', () => {
  expect(getDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(expectFileJson);
});
