import { describe, expect, it, jest, beforeEach, mock } from "bun:test";
import { EventType, HistoryByQuery, historyByQueryToFile, parseLine } from '../lib/util';
import { toSparql } from "sparqlalgebrajs";

if (Bun !== undefined) {
  Bun.write = jest.fn();
}

const writeFileMock = jest.fn();

mock.module('fs/promises', () => {
  return {
    writeFile: writeFileMock,
  };
});

describe('util', () => {
  describe('parseLine', () => {
    it('should not modify the history if line don\'t match the regex', () => {
      const history: HistoryByQuery = new Map();
      const line = `[2024-05-22T09:08:38.540Z]  INFO: Requesting http://localhost:3000/pods/00000000000000000150/comments/Mexico`;

      parseLine(line, history);

      expect(history).toStrictEqual(history);
    });

    it('should add a push event', () => {
      const history: HistoryByQuery = new Map();
      const line = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;

      parseLine(line, history);
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
      expect(history).toStrictEqual(expectedHistory);
    });

    it('should add a pop event', () => {
      const history: HistoryByQuery = new Map();
      const line = `[0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United_States","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }`;

      parseLine(line, history);
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

      const expectedHistory = new Map(
        [
          [query, { pushEvent: [], popEvent: [event] }]
        ]
      );
      expect(history).toStrictEqual(expectedHistory);
    });

    it('should add multiple event', () => {
      const history: HistoryByQuery = new Map();
      const line = `[0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United_States","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }`;

      parseLine(line, history);
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

      const expectedHistory = new Map(
        [
          [query, { pushEvent: [], popEvent: [event] }]
        ]
      );
      expect(history).toStrictEqual(expectedHistory);


      const newLine = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;

      parseLine(newLine, history);

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

      const newExpectedHistory = new Map(
        [
          [query, { pushEvent: [newEvent], popEvent: [event] }]
        ]
      )
      expect(history).toStrictEqual(newExpectedHistory);

      const lastLinePush = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States2", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;

      parseLine(lastLinePush, history);

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

      const newExpectedHistoryWithLastPushEvent = new Map(
        [
          [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistoryWithLastPushEvent);


      const lastPopLine = `[0m[34m[2024-05-22T09:08:38.824Z]  TRACE: <Link queue occupancy> { data: '{"type":"Pop","link":{"url":"http://localhost:3000/pods/00000000000000000150/comments/United","reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index","timestamp":1716368918824},"query":{"type":"project","input":{"type":"join","input":[{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"messageId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"NamedNode","value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"},"object":{"termType":"Variable","value":"creator"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"},"object":{"termType":"Variable","value":"personId"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"},"object":{"termType":"Variable","value":"firstName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"},{"termType":"Quad","value":"","subject":{"termType":"Variable","value":"creator"},"predicate":{"termType":"NamedNode","value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"},"object":{"termType":"Variable","value":"lastName"},"graph":{"termType":"DefaultGraph","value":""},"type":"pattern"}]},"variables":[{"termType":"Variable","value":"personId"},{"termType":"Variable","value":"firstName"},{"termType":"Variable","value":"lastName"}]}}' }`;

      parseLine(lastPopLine, history);

      const lastPopEvent = {
        eventType: EventType[EventType.Pop],
        url: "http://localhost:3000/pods/00000000000000000150/comments/United",
        reachability_criteria: "urn:comunica:default:extract-links/actors#solid-shape-index",
        timestamp: 1716368918824
      };

      const newExpectedHistoryWithLastPopEvent = new Map(
        [
          [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event, lastPopEvent] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistoryWithLastPopEvent);


    });

    it('should add multiple queries', () => {

      const history: HistoryByQuery = new Map();
      const line = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;

      parseLine(line, history);
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
      )
      expect(history).toStrictEqual(expectedHistory);

      const newLine = `[0m[34m[2024-05-22T09:08:38.822Z]  TRACE: <Link queue occupancy> { data: '{ "type":"Push", "link": { "url":"http://localhost:3000/pods/00000000000000000150/comments/United_States", "reachability_criteria":"urn:comunica:default:extract-links/actors#solid-shape-index", "timestamp":1716368918822, "parent": { "url":"http://localhost:3000/pods/00000000000000000150/comments/Mexico", "reachability_criteria":null} }, "query": { "type":"project", "input": { "type":"join", "input": [{ "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#687195645211"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"messageId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"NamedNode", "value":"http://localhost:3000/pods/00000000000000000150/comments/Mexico#68719564521"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator"}, "object": { "termType":"Variable", "value":"creator"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id"}, "object": { "termType":"Variable", "value":"personId"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/firstName"}, "object": { "termType":"Variable", "value":"firstName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}, { "termType":"Quad", "value":"", "subject": { "termType":"Variable", "value":"creator"}, "predicate": { "termType":"NamedNode", "value":"http://localhost:3000/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/lastName"}, "object": { "termType":"Variable", "value":"lastName"}, "graph": { "termType":"DefaultGraph", "value":""}, "type":"pattern"}] }, "variables": [{ "termType":"Variable", "value":"personId"}, { "termType":"Variable", "value":"firstName"}, { "termType":"Variable", "value":"lastName"}] } }' }`;

      parseLine(newLine, history);
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

      const newExpectedHistory = new Map(
        [
          [query, { pushEvent: [event], popEvent: [] }],
          [newQuery, { pushEvent: [newEvent], popEvent: [] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistory);

    });

  });

  describe('historyByQueryToFile', () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });


    it('should write to file using Bun', () => {
      const history: any = new Map([["a", { a: "a" }]]);
      const path = "foo";

      const expectedStringHistory = JSON.stringify({
        a: {
          a: "a"
        }
      }, null, 2);

      historyByQueryToFile(path, history);

      expect(Bun.write).toHaveBeenCalledTimes(1);
      expect(Bun.write).toHaveBeenLastCalledWith(path, expectedStringHistory);
    });

    it('should write to file using node', () => {
      const history: any = new Map([["a", { a: "a" }]]);
      const path = "foo";

      const expectedStringHistory = JSON.stringify({
        a: {
          a: "a"
        }
      }, null, 2);

      historyByQueryToFile(path, history, true);

      expect(Bun.write).toHaveBeenCalledTimes(0);

      expect(writeFileMock).toHaveBeenCalledTimes(1);
      expect(writeFileMock).toHaveBeenLastCalledWith(path, expectedStringHistory);
    });
  });
})