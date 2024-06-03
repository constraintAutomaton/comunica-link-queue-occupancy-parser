import { writeFile } from 'node:fs/promises'
import { Algebra, toSparql } from "sparqlalgebrajs";

export const REGEX_LINK_QUEUE_EVENT = /TRACE: <Link queue occupancy> { data: '(?<jsonEvent>.*)' }/

/**
 * Parse a log line into an history of link queue event
 * @param {string} line - the line from the log
 * @param {HistoryByQuery} history - the history of the link queues
 */
export function parseLine(line: string, history: HistoryByQuery):void {
    const groups = REGEX_LINK_QUEUE_EVENT.exec(line)?.groups;
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
/**
 * convert the history into a file
 * @param {string} path -
 * @param {HistoryByQuery} history 
 * @param {boolean} forceNodeJs 
 */
export async function historyByQueryToFile(path: string, history: HistoryByQuery, forceNodeJs: boolean = false):Promise<void> {
    await writeToFile(path, Object.fromEntries(history), forceNodeJs);
}

async function writeToFile(path: string, data: Object, forceNodeJs: boolean = false): Promise<void> {
    const stringObject = JSON.stringify(data, null, 2);
    if (Bun?.write === undefined || forceNodeJs) {
        await writeFile(path, stringObject);
    } else {
        await Bun.write(path, stringObject);
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