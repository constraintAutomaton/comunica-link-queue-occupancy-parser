#!/usr/bin/env node

import { Command } from 'commander';
import { fromLogFile } from './lib/runner';
import { historyByQueryToFile } from './lib/util';
const program = new Command();
program
    .name('Comunica link queue occupancy parser')
    .version('0.0.0')

    .requiredOption('-f, --log-file-path <string>', 'File path of the config')

    .option('-o, --output-path <string>', 'path to serialized link queue occupancy information', "./occupancy.json")
    .option('-p, --print', 'print the serialized link queue occupancy information into the console')
    .parse(process.argv);

const options = program.opts();
const logFilePath = options.logFilePath;
const outputPath = options.outputPath;
const print = options.print;

console.log(logFilePath);
console.log(outputPath);
console.log(print);

const history = await fromLogFile(logFilePath);


if (print) {
    console.log(JSON.stringify(Object.fromEntries(history), null, 2));
}

historyByQueryToFile(outputPath, history);


