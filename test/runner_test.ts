import { describe, expect, it, jest, mock } from "bun:test";
import { HistoryByQuery } from "../lib/util";
import { fromLogFile, fromString } from '../lib/runner';
import streamifyArray from 'streamify-array';

if (Bun !== undefined) {
    Bun.file = jest.fn().mockImplementation((data: any) => {
        return {
            stream: () => {
                data = data.map((str) => {
                    return new TextEncoder().encode(str).buffer;
                })
                return streamifyArray(data);
            }
        }
    });
}

mock.module('node:fs', () => {
    return {
        createReadStream(data: any) {
            data = data.map((str) => {
                return new TextEncoder().encode(str).buffer;
            })
            return streamifyArray(data)
        }
    };
});

describe('fromLogFile', () => {
    describe.each([
        ['bun', false],
        ['nodejs', true]
    ])("implementation %s", (implementationName, flag) => {
        it(`${implementationName}: should return an empty history given an empty string`, async () => {
            const expectedHistory: HistoryByQuery = new Map();
            const data: any = [""];

            expect(await fromLogFile(data, flag)).toStrictEqual(expectedHistory);
        });

        it(`${implementationName}: should return an history given a data with one line`, async () => {
            const data: any = [`[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`];
            const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;

            const event = {
                url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                producedByActor: {
                    name: "urn:comunica:default:extract-links/actors#predicates-solid",
                    metadata: {
                        predicates: ["http://www.w3.org/ns/pim/space#storage"],
                        matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                        checkSubject: true
                    }
                },
                parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                timestamp: 1718631765370,
                queue: {
                    popEvents: {},
                    pushEvents: {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    },
                    size: 1,
                },
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvents: [event], popEvents: [] }]
                ]
            );

            expect(await fromLogFile(data, flag)).toStrictEqual(expectedHistory);
        });

        it(`${implementationName}: should return an history given data with multiple lines`, async () => {
            const data: any = [`
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
            [0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"POP","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":0,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}}' }
            `];
            const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;


            const pushEvents = {
                url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                producedByActor: {
                    name: "urn:comunica:default:extract-links/actors#predicates-solid",
                    metadata: {
                        predicates: ["http://www.w3.org/ns/pim/space#storage"],
                        matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                        checkSubject: true
                    }
                },
                parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                timestamp: 1718631765370,
                queue: {
                    popEvents: {},
                    pushEvents: {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    },
                    size: 1,
                },
            };

            const popEvents = {
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
                timestamp: 1718631765370
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvents: [pushEvents], popEvents: [popEvents] }]
                ]
            );

            expect(await fromLogFile(data, flag)).toStrictEqual(expectedHistory);
        });

        it(`${implementationName}: should return an history given data with multiple lines from multiple queries`, async () => {
            const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`;
            const newLine = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId1.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`;

            const data: any = [
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                line,
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                newLine
            ];

            const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;

            const event = {
                url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
                producedByActor: {
                    name: "urn:comunica:default:extract-links/actors#predicates-solid",
                    metadata: {
                        predicates: ["http://www.w3.org/ns/pim/space#storage"],
                        matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                        checkSubject: true
                    }
                },
                parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                timestamp: 1718631765370,
                queue: {
                    popEvents: {},
                    pushEvents: {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    },
                    size: 1,
                },
            };

            const newQuery = `SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId1.\n}`;


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
                parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
                timestamp: 1718631765370,
                queue: {
                    popEvents: {},
                    pushEvents: {
                        "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                    },
                    size: 1,
                },
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvents: [event], popEvents: [] }],
                    [newQuery, { pushEvents: [newEvent], popEvents: [] }]
                ]
            );

            expect(await fromLogFile(data, flag)).toStrictEqual(expectedHistory);
        });
    });
});

describe('fromString', () => {
    it('should return an empty history given an empty string', () => {
        const expectedHistory: HistoryByQuery = new Map();
        const data = "";

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given a data with one line', () => {
        const data = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`;
        const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;


        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-solid",
                metadata: {
                    predicates: ["http://www.w3.org/ns/pim/space#storage"],
                    matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                    checkSubject: true
                }
            },
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
            timestamp: 1718631765370,
            queue: {
                popEvents: {},
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 1,
            },
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [event], popEvents: [] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines', () => {
        const data = `
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
            [0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
            [0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"POP","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":0,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}}' }
            `;
        const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;


        const pushEvents = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-solid",
                metadata: {
                    predicates: ["http://www.w3.org/ns/pim/space#storage"],
                    matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                    checkSubject: true
                }
            },
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
            timestamp: 1718631765370,
            queue: {
                popEvents: {},
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 1,
            },
        };

        const popEvents = {
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
            timestamp: 1718631765370
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvents: [pushEvents], popEvents: [popEvents] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines from multiple queries', () => {
        const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`;
        const newLine = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId1.\\n}","queue":{"size":1,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{}}}' }`;

        const data: string = [
            `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
            line,
            `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
            newLine
        ].join("\n");

        const query = `SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\n}`;

        const event = {
            url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
            producedByActor: {
                name: "urn:comunica:default:extract-links/actors#predicates-solid",
                metadata: {
                    predicates: ["http://www.w3.org/ns/pim/space#storage"],
                    matchingPredicate: "http://www.w3.org/ns/pim/space#storage",
                    checkSubject: true
                }
            },
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
            timestamp: 1718631765370,
            queue: {
                popEvents: {},
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 1,
            },
        };

        const newQuery = `SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId1.\n}`;


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
            parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
            timestamp: 1718631765370,
            queue: {
                popEvents: {},
                pushEvents: {
                    "urn:comunica:default:extract-links/actors#predicates-solid": 1,
                },
                size: 1,
            },
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
