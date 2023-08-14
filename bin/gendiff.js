#!/usr/bin/env node
import { program } from 'commander';
import getDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.8.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format(choice: stylish, plain, json)', 'stylish')
  .action((filepath1, filepath2, opts) => {
    console.log(getDiff(filepath1, filepath2, opts.format));
  });
program.parse();
