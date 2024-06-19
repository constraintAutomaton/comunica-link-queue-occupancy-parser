import { describe, expect, it, jest, beforeEach, mock } from "bun:test";
import {  HistoryByQuery, historyByQueryToFile, parseLine } from '../lib/util';

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
      const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{}}}' }`;

      parseLine(line, history);
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
          popEvent: {},
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 1,
        },
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
      const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"POP","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":0,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}}' }`;

      parseLine(line, history);
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
        queue: {
          popEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 0,
        },
        timestamp: 1718631765370
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
      const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"POP","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":0,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}}' }`;

      parseLine(line, history);
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
        queue: {
          popEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 0,
        },
        timestamp: 1718631765370
      };

      const expectedHistory = new Map(
        [
          [query, { pushEvent: [], popEvent: [event] }]
        ]
      );
      expect(history).toStrictEqual(expectedHistory);


      const newLine = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{}}}' }`;

      parseLine(newLine, history);

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
          popEvent: {},
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 1,
        },
        parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card",
        timestamp: 1718631765370
      };

      const newExpectedHistory = new Map(
        [
          [query, { pushEvent: [newEvent], popEvent: [event] }]
        ]
      )
      expect(history).toStrictEqual(newExpectedHistory);

      const lastLinePush = `[0m[34m[2024-06-17T13:42:45.473Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":1718631765472,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":1},"popEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}}' }`;

      parseLine(lastLinePush, history);
      const lastPushEvent = {
        url: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/",
        producedByActor: {
          name: "urn:comunica:default:extract-links/actors#predicates-ldp",
          metadata: {
            predicates: ["http://www.w3.org/ns/ldp#contains"],
            matchingPredicate: "http://www.w3.org/ns/ldp#contains",
            checkSubject: true
          }
        },
        parent: "https://solidbench.linkeddatafragments.org/pods/00000000000000000933/",
        timestamp: 1718631765472,
        queue: {
          popEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-ldp": 1,
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 1,
        }
      };

      const newExpectedHistoryWithLastPushEvent = new Map(
        [
          [query, { pushEvent: [newEvent, lastPushEvent], popEvent: [event] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistoryWithLastPushEvent);


      const lastPopLine = `[0m[34m[2024-06-17T13:42:45.473Z]  TRACE: Link queue changed { data: '{"type":"POP","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":1718631765473},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":4,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":5},"popEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":1}}}' }`;

      parseLine(lastPopLine, history);

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
        timestamp: 1718631765473,
        queue: {
          popEvent: {
            "urn:comunica:default:extract-links/actors#predicates-ldp": 1,
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-ldp": 5,
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 4,
        }
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
      const line = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId.\\n}","queue":{"size":1,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{}}}' }`;

      parseLine(line, history);
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
          popEvent: {},
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 1,
        },
      };

      const expectedHistory = new Map(
        [
          [query, { pushEvent: [event], popEvent: [] }]
        ]
      )
      expect(history).toStrictEqual(expectedHistory);

      const newLine = `[0m[34m[2024-06-17T13:42:45.370Z]  TRACE: Link queue changed { data: '{"type":"PUSH","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":1718631765370,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card"},"query":"SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.\\n  ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.\\n  ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId1.\\n}","queue":{"size":1,"pushEvent":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvent":{}}}' }`;

      parseLine(newLine, history);
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
          popEvent: {},
          pushEvent: {
            "urn:comunica:default:extract-links/actors#predicates-solid": 1,
          },
          size: 1,
        },
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