import { describe, expect, it, jest, beforeEach, mock } from "bun:test";
import { HistoryByQuery, historyByQueryToFile, parseLine } from '../lib/util';

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
      const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

      parseLine(line, history);
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
      expect(history).toStrictEqual(expectedHistory);
    });

    it('should add a pop event', () => {
      const history: HistoryByQuery = new Map();
      const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"popEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":2144.988653},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":0,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.018Z","v":0}`;

      parseLine(line, history);
      const query = "SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }";

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

      const expectedHistory = new Map(
        [
          [query, { pushEvents: [], popEvents: [event] }]
        ]
      );
      expect(history).toStrictEqual(expectedHistory);
    });

    it('should add multiple event', () => {
      const history: HistoryByQuery = new Map();
      const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

      parseLine(line, history);
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
      expect(history).toStrictEqual(expectedHistory);


      const newLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"popEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-solid","metadata":{"predicates":["http://www.w3.org/ns/pim/space#storage"],"matchingPredicate":"http://www.w3.org/ns/pim/space#storage","checkSubject":true}},"timestamp":2144.988653},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":0,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.018Z","v":0}`;

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

      const newExpectedHistory = new Map(
        [
          [query, { pushEvents: [event], popEvents: [newEvent] }]
        ]
      )
      expect(history).toStrictEqual(newExpectedHistory);

      const lastLinePush = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

      parseLine(lastLinePush, history);
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

      const newExpectedHistoryWithLastPushEvent = new Map(
        [
          [query, { pushEvents: [event, lastPushEvent], popEvents: [newEvent] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistoryWithLastPushEvent);


      const lastPopLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"popEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.305014},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":4,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":5},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

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

      const newExpectedHistoryWithLastPopEvent = new Map(
        [
          [query, { pushEvents: [event, lastPushEvent], popEvents: [newEvent, lastPopEvent] }]
        ]
      );
      expect(history).toStrictEqual(newExpectedHistoryWithLastPopEvent);


    });

    it('should add multiple queries', () => {
      const history: HistoryByQuery = new Map();

      const line = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

      parseLine(line, history);
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
      expect(history).toStrictEqual(expectedHistory);

      const newLine = `{"name":"comunica","streamProviders":[{"level":"trace"}],"hostname":"bryanelliott-latitude5530","pid":23430,"level":10,"data":{"type":"pushEvent","link":{"url":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/comments/","producedByActor":{"name":"urn:comunica:default:extract-links/actors#predicates-ldp","metadata":{"predicates":["http://www.w3.org/ns/ldp#contains"],"matchingPredicate":"http://www.w3.org/ns/ldp#contains","checkSubject":true}},"timestamp":2200.1834,"parent":"https://solidbench.linkeddatafragments.org/pods/00000000000000000933/"},"query":"SELECT ?messageId1 ?messageCreationDate ?messageContent WHERE {   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasCreator> <https://solidbench.linkeddatafragments.org/pods/00000000000000000933/profile/card#me>.   ?message <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/Post>.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/content> ?messageContent.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate> ?messageCreationDate.   ?message <https://solidbench.linkeddatafragments.org/www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/id> ?messageId. }","queue":{"size":2,"pushEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1,"urn:comunica:default:extract-links/actors#predicates-ldp":2},"popEvents":{"urn:comunica:default:extract-links/actors#predicates-solid":1}}},"msg":"Link queue changed","time":"2024-06-24T07:28:58.073Z","v":0}`;

      parseLine(newLine, history);
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

      const newExpectedHistory = new Map(
        [
          [query, { pushEvents: [event], popEvents: [] }],
          [newQuery, { pushEvents: [newEvent], popEvents: [] }]
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