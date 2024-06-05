import { describe, expect, it, jest, beforeEach, mock } from "bun:test";
import { EventType, HistoryByQuery } from "../lib/util";
import { fromLogFile, fromString } from '../lib/runner';
import { toSparql } from "sparqlalgebrajs";

const streamifyArray = require('streamify-array');

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
        createReadStream(data: any){
            data = data.map((str) => {
                return new TextEncoder().encode(str).buffer;
            })
            return streamifyArray(data)
        }
    };
});

describe('fromLogFile', () => {
    describe('bun', () => {
        it('should return an empty history given an empty string', async () => {
            const expectedHistory: HistoryByQuery = new Map();
            const data: any = [""];

            expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
        });

        it('should return an history given a data with one line', async () => {
            const data: any = [`[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`];
            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [event], popEvent: [] }]
                ]
            );

            expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
        });

        it('should return an history given data with multiple lines', async () => {
            const data: any = [`
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
            [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United_States","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
            [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States2", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
            [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
            `];
            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Pop],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918824
            };

            const newEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const lastPushEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States2",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const lastPopEvent = {
                eventType: EventType[EventType.Pop],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918824
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event, lastPopEvent] }]
                ]
            );

            expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
        });

        it('should return an history given data with multiple lines from multiple queries', async () => {
            const data: any = [
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`,
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`,
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`
            ];

            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };
            const newQuery = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const newEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [event], popEvent: [] }],
                    [newQuery, { pushEvent: [newEvent], popEvent: [] }]
                ]
            );

            expect(await fromLogFile(data)).toStrictEqual(expectedHistory);
        });
    });

    describe('nodejs', () => {
        it('should return an empty history given an empty string', async () => {
            const expectedHistory: HistoryByQuery = new Map();
            const data: any = [""];

            expect(await fromLogFile(data, true)).toStrictEqual(expectedHistory);
        });

        it('should return an history given a data with one line', async () => {
            const data: any = [`[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`];
            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [event], popEvent: [] }]
                ]
            );

            expect(await fromLogFile(data, true)).toStrictEqual(expectedHistory);
        });

        it('should return an history given data with multiple lines', async () => {
            const data: any = [`
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
            [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United_States","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
            [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
            [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States2", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
            [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
            `];
            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Pop],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918824
            };

            const newEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const lastPushEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States2",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const lastPopEvent = {
                eventType: EventType[EventType.Pop],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918824
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event, lastPopEvent] }]
                ]
            );

            expect(await fromLogFile(data, true)).toStrictEqual(expectedHistory);
        });

        it('should return an history given data with multiple lines from multiple queries', async () => {
            const data: any = [
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`,
                `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`,
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`,
                `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`
            ];

            const query = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const event = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };
            const newQuery = toSparql(<any>{
                "type": "project",
                "input": {
                    "type": "join",
                    "input": [
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "messageId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "personId"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "firstName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        },
                        {
                            "termType": "Quad",
                            "value": "",
                            "subject": {
                                "termType": "Variable",
                                "value": "creator"
                            },
                            "predicate": {
                                "termType": "NamedNode",
                                "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                            },
                            "object": {
                                "termType": "Variable",
                                "value": "lastName"
                            },
                            "graph": {
                                "termType": "DefaultGraph",
                                "value": ""
                            },
                            "type": "pattern"
                        }
                    ]
                },
                "variables": [
                    {
                        "termType": "Variable",
                        "value": "personId"
                    },
                    {
                        "termType": "Variable",
                        "value": "firstName"
                    },
                    {
                        "termType": "Variable",
                        "value": "lastName"
                    }
                ]
            });

            const newEvent = {
                eventType: EventType[EventType.Push],
                url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
                reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
                timestamp: 1716368918822,
                parent: {
                    url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                    reachability_criteria: null
                }
            };

            const expectedHistory = new Map(
                [
                    [query, { pushEvent: [event], popEvent: [] }],
                    [newQuery, { pushEvent: [newEvent], popEvent: [] }]
                ]
            );

            expect(await fromLogFile(data, true)).toStrictEqual(expectedHistory);
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
        const data = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;
        const query = toSparql(<any>{
            "type": "project",
            "input": {
                "type": "join",
                "input": [
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "messageId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "personId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "firstName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "lastName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    }
                ]
            },
            "variables": [
                {
                    "termType": "Variable",
                    "value": "personId"
                },
                {
                    "termType": "Variable",
                    "value": "firstName"
                },
                {
                    "termType": "Variable",
                    "value": "lastName"
                }
            ]
        });

        const event = {
            eventType: EventType[EventType.Push],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918822,
            parent: {
                url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                reachability_criteria: null
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvent: [event], popEvent: [] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines', () => {
        const data = `
        [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
        [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United_States","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
        [2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico
        [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
        [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States2", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
        [0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }
        `;
        const query = toSparql(<any>{
            "type": "project",
            "input": {
                "type": "join",
                "input": [
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "messageId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "personId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "firstName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "lastName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    }
                ]
            },
            "variables": [
                {
                    "termType": "Variable",
                    "value": "personId"
                },
                {
                    "termType": "Variable",
                    "value": "firstName"
                },
                {
                    "termType": "Variable",
                    "value": "lastName"
                }
            ]
        });

        const event = {
            eventType: EventType[EventType.Pop],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918824
        };

        const newEvent = {
            eventType: EventType[EventType.Push],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918822,
            parent: {
                url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                reachability_criteria: null
            }
        };

        const lastPushEvent = {
            eventType: EventType[EventType.Push],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States2",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918822,
            parent: {
                url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                reachability_criteria: null
            }
        };

        const lastPopEvent = {
            eventType: EventType[EventType.Pop],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918824
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event, lastPopEvent] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });

    it('should return an history given data with multiple lines from multiple queries', () => {
        const data = `
        [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
        [0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }
        `;

        const query = toSparql(<any>{
            "type": "project",
            "input": {
                "type": "join",
                "input": [
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "messageId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "personId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "firstName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "lastName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    }
                ]
            },
            "variables": [
                {
                    "termType": "Variable",
                    "value": "personId"
                },
                {
                    "termType": "Variable",
                    "value": "firstName"
                },
                {
                    "termType": "Variable",
                    "value": "lastName"
                }
            ]
        });

        const event = {
            eventType: EventType[EventType.Push],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918822,
            parent: {
                url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                reachability_criteria: null
            }
        };
        const newQuery = toSparql(<any>{
            "type": "project",
            "input": {
                "type": "join",
                "input": [
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "messageId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "personId"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "firstName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    },
                    {
                        "termType": "Quad",
                        "value": "",
                        "subject": {
                            "termType": "Variable",
                            "value": "creator"
                        },
                        "predicate": {
                            "termType": "NamedNode",
                            "value": "http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"
                        },
                        "object": {
                            "termType": "Variable",
                            "value": "lastName"
                        },
                        "graph": {
                            "termType": "DefaultGraph",
                            "value": ""
                        },
                        "type": "pattern"
                    }
                ]
            },
            "variables": [
                {
                    "termType": "Variable",
                    "value": "personId"
                },
                {
                    "termType": "Variable",
                    "value": "firstName"
                },
                {
                    "termType": "Variable",
                    "value": "lastName"
                }
            ]
        });

        const newEvent = {
            eventType: EventType[EventType.Push],
            url: "http://localhost:3000/pods/00000000000000000150/comments/United_States",
            reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
            timestamp: 1716368918822,
            parent: {
                url: "http://localhost:3000/pods/00000000000000000150/comments/Mexico",
                reachability_criteria: null
            }
        };

        const expectedHistory = new Map(
            [
                [query, { pushEvent: [event], popEvent: [] }],
                [newQuery, { pushEvent: [newEvent], popEvent: [] }]
            ]
        );

        expect(fromString(data)).toStrictEqual(expectedHistory);
    });
});