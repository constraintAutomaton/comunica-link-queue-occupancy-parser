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

## CLI

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
    "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}": {
        "pushEvents": [
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                "producedByActor": {
                    "name": "urn:comunica:default:extract-links/actors#predicates-solid",
                    "metadata": {
                        "predicates": [
                            "http://www.w3.org/ns/pim/space#storage"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/pim/space#storage",
                        "checkSubject": true
                    }
                },
                "timestamp": 1718631765370,
                "parent": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                "queue": {
                    "size": 1,
                    "pushEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1
                    },
                    "popEvents": {}
                }
            },
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
                "producedByActor": {
                    "name": "urn:comunica:default:extract-links/actors#predicates-ldp",
                    "metadata": {
                        "predicates": [
                            "http://www.w3.org/ns/ldp#contains"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/ldp#contains",
                        "checkSubject": true
                    }
                },
                "timestamp": 1718631765472,
                "parent": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                "queue": {
                    "size": 1,
                    "pushEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                        "urn:comunica:default:extract-links/actors#predicates-ldp": 1
                    },
                    "popEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1
                    }
                }
            },
            ...
            {
                "url": "https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/data/forum00000000755914244125",
                "producedByActor": {
                  "name": "urn:comunica:default:extract-links/actors#predicates-common",
                  "metadata": {
                    "predicates": [
                      "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                      "http://www.w3.org/2002/07/owl##sameAs",
                      "http://xmlns.com/foaf/0.1/isPrimaryTopicOf"
                    ],
                    "matchingPredicate": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                    "checkSubject": false
                  }
                },
                "timestamp": 1718631766440,
                "parent": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/posts/2011-11-17",
                "queue": {
                  "size": 1,
                  "pushEvents": {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                    "urn:comunica:default:extract-links/actors#predicates-common": 32
                  },
                  "popEvents": {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                    "urn:comunica:default:extract-links/actors#predicates-common": 31
                  }
                }
              }
        ],
        "popEvents": [
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                "producedByActor": {
                    "name": "urn:comunica:default:extract-links/actors#predicates-solid",
                    "metadata": {
                        "predicates": [
                            "http://www.w3.org/ns/pim/space#storage"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/pim/space#storage",
                        "checkSubject": true
                    }
                },
                "timestamp": 1718631765370,
                "queue": {
                    "size": 0,
                    "pushEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1
                    },
                    "popEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1
                    }
                }
            },
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
                "producedByActor": {
                    "name": "urn:comunica:default:extract-links/actors#predicates-ldp",
                    "metadata": {
                        "predicates": [
                            "http://www.w3.org/ns/ldp#contains"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/ldp#contains",
                        "checkSubject": true
                    }
                },
                "timestamp": 1718631765473,
                "queue": {
                    "size": 4,
                    "pushEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                        "urn:comunica:default:extract-links/actors#predicates-ldp": 5
                    },
                    "popEvents": {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                        "urn:comunica:default:extract-links/actors#predicates-ldp": 1
                    }
                }
            },
            ...
            {
                "url": "https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/data/forum00000000755914244125",
                "producedByActor": {
                  "name": "urn:comunica:default:extract-links/actors#predicates-common",
                  "metadata": {
                    "predicates": [
                      "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                      "http://www.w3.org/2002/07/owl##sameAs",
                      "http://xmlns.com/foaf/0.1/isPrimaryTopicOf"
                    ],
                    "matchingPredicate": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                    "checkSubject": false
                  }
                },
                "timestamp": 1718631766440,
                "queue": {
                  "size": 0,
                  "pushEvents": {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                    "urn:comunica:default:extract-links/actors#predicates-common": 32
                  },
                  "popEvents": {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                    "urn:comunica:default:extract-links/actors#predicates-common": 32
                  }
                }
              }
        ]
    }
}
```
