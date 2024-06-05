# comunica-link-queue-occupancy-parser

A simple software/library to parse the link queue occupancy of [comunica-feature-link-traversal](https://github.com/comunica/comunica-feature-link-traversal)

## Installation

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
## Example output
```json
{
  "SELECT ?personId ?firstName ?lastName WHERE {\n  <http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521> <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n  <http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521> <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> ?creator.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?personId.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName> ?firstName.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName> ?lastName.\n}": {
    "pushEvent": [
      {
        "url": "http://localhost:3000/pods/00000000000000000150/comments/United_States",
        "reachability_criteria": "urn:comunica:default:extract-links/actors#solid-shape-index",
        "timestamp": 1716368918822,
        "parent": {
          "url": "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
          "reachability_criteria": null
        },
        "eventType": "Push"
      },
      {
        "url": "http://localhost:3000/pods/00000000000000000150/comments/Finland",
        "reachability_criteria": "urn:comunica:default:extract-links/actors#solid-shape-index",
        "timestamp": 1716368918822,
        "parent": {
          "url": "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
          "reachability_criteria": null
        },
        "eventType": "Push"
      },
      ...
    ],
    "popEvent": [
      {
        "url": "http://localhost:3000/pods/00000000000000000150/comments/United_States",
        "reachability_criteria": "urn:comunica:default:extract-links/actors#solid-shape-index",
        "timestamp": 1716368918824,
        "eventType": "Pop"
      },
     ...
    ]
  }
}
```
