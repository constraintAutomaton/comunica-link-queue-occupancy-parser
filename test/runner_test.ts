import { describe, expect, it } from "bun:test";
import { HistoryByQuery } from "../lib/util";
import { fromLogFile, fromString } from '../lib/runner';

describe('fromLogFile', () => {

    it(`should return an empty history given an empty string`, async () => {
        const expectedHistory: HistoryByQuery = new Map();
        const data = "./test/log_file/empty";

        expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
    });

    it(`should return an history given a data with one line`, async () => {
        const data = "./test/log_file/one_line";
        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event], popEvents: [] }]
            ]
        );

        expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
    });

    it(`should return an history given data with multiple lines`, async () => {

        const data = "./test/log_file/multiple_line";

        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const newEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-solid",
                metadata: {
                    predicates: ["http://www.w3.org/ns/pim/space#storage"],
                    matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                    checkSubject: true
                }
            },
            queue: {
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 0,
            },
            timestamp: 2144.988653
        };

        const lastPushEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: ["http://www.w3.org/ns/ldp#contains"],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            timestamp: 2200.1834,
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const lastPopEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: ["http://www.w3.org/ns/ldp#contains"],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.305014,
            queue: {
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 1,
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 5,
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 4,
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event, lastPushEvent], popEvents: [newEvent, lastPopEvent] }]
            ]
        );
        expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
    });

    it(`should return an history given data with multiple lines from multiple queries`, async () => {

        const data = "./test/log_file/multiple_queries";

        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };


        const newQuery = "SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const newEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event], popEvents: [] }],
                [newQuery, { pushEvents: [newEvent], popEvents: [] }]
            ]
        );

        expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
    });
});


describe('fromString', () => {
    it('should return an empty history given an empty string', () => {
        const expectedHistory: HistoryByQuery = new Map();
        const data = "";

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given a data with one line', () => {
        const data: any = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event], popEvents: [] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines', () => {
        const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;
        const newLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"popEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":2144.988653},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":0,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.018Z","v":0}`;
        const lastLinePush = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;
        const lastPopLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"popEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.305014},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":4,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":5},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

        const data = [line, "aasda", newLine, lastLinePush, "aaa", lastPopLine].join("\n");

        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const newEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-solid",
                metadata: {
                    predicates: ["http://www.w3.org/ns/pim/space#storage"],
                    matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                    checkSubject: true
                }
            },
            queue: {
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 0,
            },
            timestamp: 2144.988653
        };

        const lastPushEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: ["http://www.w3.org/ns/ldp#contains"],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            timestamp: 2200.1834,
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const lastPopEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: ["http://www.w3.org/ns/ldp#contains"],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.305014,
            queue: {
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 1,
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 5,
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 4,
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event, lastPushEvent], popEvents: [newEvent, lastPopEvent] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines from multiple queries', () => {
        const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;
        const newLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

        const data: any = ["asdad", "aa", line, "dasdas", "{}", newLine].join("\n");

        const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };


        const newQuery = "SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

        const newEvent = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-ldp",
                metadata: {
                    predicates: [
                        "http://www.w3.org/ns/ldp#contains"
                    ],
                    matchingPredicate: "http://www.w3.org/ns/ldp#contains",
                    checkSubject: true
                }
            },
            timestamp: 2200.1834,
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            queue: {
                size: 2,
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    "urn:comunica:default:extract-links/actors#predicates-ldp": 2
                },
                popEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1
                }
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event], popEvents: [] }],
                [newQuery, { pushEvents: [newEvent], popEvents: [] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });
});
