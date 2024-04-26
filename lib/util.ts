import { ReadStream, createReadStream } from "node:fs";
import { writeFile } from 'node:fs/promises'
import { Algebra, toSparql } from "sparqlalgebrajs";

export const REGEX_LINK_QUEUE_EVENT = new RegExp("TRACE: <Link queue occupancy> { data: '(?<jsonEvent>.*)' }", 'gm')

/**
 * Parse a log line into an history of link queue event
 * @param {string} line - the line from the log
 * @param {HistoryByQuery} history - the history of the link queues
 * @param {RegExp} [regexLinkQueueEvent=REGEX_LINK_QUEUE_EVENT] - regex to identify a link queue event in the log
 */
export function parseLine(line: string, history: HistoryByQuery, regexLinkQueueEvent: RegExp = REGEX_LINK_QUEUE_EVENT) {
    const groups = regexLinkQueueEvent.exec(line)?.groups;
    if (groups !== undefined) {
        const linkQueueEvent: ILinkQueueEvent = JSON.parse(groups['jsonEvent']);
        const query = toSparql((linkQueueEvent.query as any));
        let currentHistory = history.get(query);
        if (currentHistory === undefined) {
            history.set(query, { pushEvent: [], popEvent: [] });
            currentHistory = history.get(query)!;
        }
        switch (linkQueueEvent.type) {
            case EventType[EventType.Push]:
                linkQueueEvent.link.eventType = EventType[EventType.Push];
                currentHistory.pushEvent.push(linkQueueEvent.link);
                break;

            case EventType[EventType.Pop]:
                linkQueueEvent.link.eventType = EventType[EventType.Pop];
                currentHistory.popEvent.push(linkQueueEvent.link);
                break;
        }
    }
}

export async function getStream(path: string, forceNodeJs: boolean = false): Promise<ReadableStream<any> | ReadStream> {
    if (Bun?.file === undefined || forceNodeJs) {
        return createReadStream(path);
    } else {
        const file = Bun.file(path);
        return await file.stream();
    }
}

export function toTimeline(query: Algebra.Operation, historyByQuery: HistoryByQuery): TimeLine | undefined {
    const history = historyByQuery.get(toSparql(query));

    if (history === undefined) {
        return undefined;
    }
    return history.popEvent
        .concat(history.pushEvent)
        .filter((event: IURLStatistic) => event.timestamp !== undefined)
        .sort((first: IURLStatistic, second: IURLStatistic) => {
            if (first.timestamp! < second.timestamp!) {
                return -1
            } else if (first.timestamp! > second.timestamp!) {
                return 1;
            }
            return 0;
        });
}

export async function timelineToFile(path: string, timeline: TimeLine, forceNodeJs: boolean = false): Promise<void> {
    const timelineJson = { data: timeline };
    await writeToFile(path, timelineJson, forceNodeJs);
}

export async function historyToFile(path: string, history: IHistory, forceNodeJs: boolean = false): Promise<void> {
    await writeToFile(path, history, forceNodeJs);
}

export async function historyByQueryToFile(path: string, history: HistoryByQuery, forceNodeJs: boolean = false) {
    await writeToFile(path, Object.fromEntries(history), forceNodeJs);
}

async function writeToFile(path: string, data: Object, forceNodeJs: boolean = false): Promise<void> {
    if (Bun?.write === undefined || forceNodeJs) {
        await writeFile(path, JSON.stringify(data, null, 2));
    } else {
        await Bun.write(path, JSON.stringify(data, null, 2));
    }
}

/**
 * Event type of the link queue
 */
export enum EventType {
    Push,
    Pop,
}

export type HistoryByQuery = Map<string, IHistory>;

/**
 * Timeline of the link queue divided into pushed and popped
 */
export interface IHistory {
    pushEvent: IURLStatistic[];
    popEvent: IURLStatistic[];
}
/**
 * Timeline of the link queue event
 */
export type TimeLine = IURLStatistic[];
/**
 * Information about an URL
 */
export interface IURLStatistic {
    eventType?: string;
    url: string;
    reachability_criteria: string | null;
    timestamp?: number;
    parent?: IURLStatistic;
}
/**
* A link queue event
*/
export interface ILinkQueueEvent {
    type: string;
    link: IURLStatistic;
    query: Algebra.Operation;
}