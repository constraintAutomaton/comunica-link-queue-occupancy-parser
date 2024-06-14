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
    "SELECT ?personId ?firstName ?lastName WHERE {\n  <http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521> <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n  <http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521> <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> ?creator.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?personId.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName> ?firstName.\n  ?creator <http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName> ?lastName.\n}": {
        "pushEvent": [
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-solid",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/ns/pim/space#storage"
                    ],
                    "matchingPredicate": "http://www.w3.org/ns/pim/space#storage",
                    "checkSubject": true
                },
                "timestamp": 1718116547072,
                "parent": {
                    "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                    "reachability_criteria": null
                },
                "eventType": "Push",
                "queueStatistics": {
                    "size": 1,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1
                        },
                        "popEvent": {}
                    }
                }
            },
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-ldp",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    "matchingPredicate": "http://www.w3.org/ns/ldp#contains",
                    "checkSubject": true
                },
                "timestamp": 1718116547146,
                "parent": {
                    "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                    "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-solid",
                    "reachability_criteria_dynamic_info": {
                        "predicates": [
                            "http://www.w3.org/ns/pim/space#storage"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/pim/space#storage",
                        "checkSubject": true
                    }
                },
                "eventType": "Push",
                "queueStatistics": {
                    "size": 1,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 1
                        },
                        "popEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1
                        }
                    }
                }
            },
        ...
          {
                "url": "https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/data/forum00000000755914244125",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-common",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                        "http://www.w3.org/2002/07/owl##sameAs",
                        "http://xmlns.com/foaf/0.1/isPrimaryTopicOf"
                    ],
                    "matchingPredicate": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                    "checkSubject": false
                },
                "timestamp": 1718116548176,
                "parent": {
                    "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/posts/2011-11-17",
                    "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-ldp",
                    "reachability_criteria_dynamic_info": {
                        "predicates": [
                            "http://www.w3.org/ns/ldp#contains"
                        ],
                        "matchingPredicate": "http://www.w3.org/ns/ldp#contains",
                        "checkSubject": true
                    }
                },
                "eventType": "Push",
                "queueStatistics": {
                    "size": 1,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                            "urn:comunica:default:extract-links/actors#predicates-common": 33
                        },
                        "popEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                            "urn:comunica:default:extract-links/actors#predicates-common": 32
                        }
                    }
                }
            }
        ],
        "popEvent": [
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-solid",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/ns/pim/space#storage"
                    ],
                    "matchingPredicate": "http://www.w3.org/ns/pim/space#storage",
                    "checkSubject": true
                },
                "timestamp": 1718116547073,
                "eventType": "Pop",
                "queueStatistics": {
                    "size": 0,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1
                        },
                        "popEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1
                        }
                    }
                }
            },
            {
                "url": "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-ldp",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    "matchingPredicate": "http://www.w3.org/ns/ldp#contains",
                    "checkSubject": true
                },
                "timestamp": 1718116547147,
                "eventType": "Pop",
                "queueStatistics": {
                    "size": 4,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 5
                        },
                        "popEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 1
                        }
                    }
                }
            },
       ...
           {
                "url": "https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/data/forum00000000755914244125",
                "reachability_criteria": "urn:comunica:default:extract-links/actors#predicates-common",
                "reachability_criteria_dynamic_info": {
                    "predicates": [
                        "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                        "http://www.w3.org/2002/07/owl##sameAs",
                        "http://xmlns.com/foaf/0.1/isPrimaryTopicOf"
                    ],
                    "matchingPredicate": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
                    "checkSubject": false
                },
                "timestamp": 1718116548176,
                "eventType": "Pop",
                "queueStatistics": {
                    "size": 0,
                    "reachabilityRatio": {
                        "pushEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                            "urn:comunica:default:extract-links/actors#predicates-common": 33
                        },
                        "popEvent": {
                            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                            "urn:comunica:default:extract-links/actors#predicates-ldp": 91,
                            "urn:comunica:default:extract-links/actors#predicates-common": 33
                        }
                    }
                }
            }
        ]
    }
}
```
