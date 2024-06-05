# comunica-link-queue-occupancy-parser

A simple software/library to parse the link queue occupancy of [comunica-feature-link-traversal](https://github.com/comunica/comunica-feature-link-traversal)

## installation

```bash
bun install
```

# Usage

## Library
```ts
import { fromLogFile, historyByQueryToFile } from 'comunica-link-queue-occupancy-parser';

const logFilePath = "{somewhere nice}";
const history = await fromLogFile(logFilePath);
historyByQueryToFile(outputPath, history);
```

## Cli

The cli program is located at `./link-queue-parser.ts` or in the build folder `./build/link-queue-parser.js`

```
Options:
  -V, --version                 output the version number
  -f, --log-file-path <string>  File path of the config
  -o, --output-path <string>    path to serialized link queue occupancy information (default: "./occupancy.json")
  -p, --print                   print the serialized link queue occupancy information into the console
  -h, --help                    display help for command
```
