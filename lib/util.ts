import { writeFile } from 'node:fs/promises'

export const REGEX_LINK_QUEUE_EVENT = /TRACE: <Link queue occupancy> { data: '(?<jsonEvent>.*)' }/

/**
 * Parse a log line into an history of link queue event
 * @param {string} line - the line from the log
 * @param {HistoryByQuery} history - the history of the link queues
 */
export function parseLine(line: string, history: HistoryByQuery): void {
    const groups = REGEX_LINK_QUEUE_EVENT.exec(line)?.groups;
    if (groups !== undefined) {
        const linkQueueEvent: ILinkQueueEvent = JSON.parse(groups['jsonEvent']);
        const query = linkQueueEvent.query;
        let currentHistory = history.get(query);
        if (currentHistory === undefined) {
            history.set(query, { pushEvent: [], popEvent: [] });
            currentHistory = history.get(query)!;
        }
        switch (linkQueueEvent.type) {
            case EventType[EventType.PUSH]:
                currentHistory.pushEvent.push({...linkQueueEvent.link, queue:linkQueueEvent.queue});
                break;

            case EventType[EventType.POP]:
                currentHistory.popEvent.push({...linkQueueEvent.link, queue:linkQueueEvent.queue});
                break;
        }
    }
}
/**
 * convert the history into a file
 * @param {string} path
 * @param {HistoryByQuery} history 
 * @param {boolean} forceNodeJs 
 */
export async function historyByQueryToFile(path: string, history: HistoryByQuery, forceNodeJs = false): Promise<void> {
    await writeToFile(path, Object.fromEntries(history), forceNodeJs);
}

async function writeToFile(path: string, data: unknown, forceNodeJs = false): Promise<void> {
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
    PUSH,
    POP,
}

export type HistoryByQuery = Map<string, IHistory>;

/**
 * Timeline of the link queue divided into pushed and popped
 */
export interface IHistory {
    pushEvent: object[];
    popEvent: object[];
}

/**
* A link queue event
*/
export interface ILinkQueueEvent {
    type: string;
    link: object;
    query: string;
    queue: object;
}

