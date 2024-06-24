import { writeFile } from 'node:fs/promises'

export const REGEX_LINK_QUEUE_EVENT = /.*?(?<jsonEvent>{.+?"Link queue changed".*})/g;

/**
 * Parse a log line into an history of link queue event
 * @param {string} line - the line from the log
 * @param {HistoryByQuery} history - the history of the link queues
 */
export function parseLine(line: string, history: HistoryByQuery): void {
    const regexResults = REGEX_LINK_QUEUE_EVENT.exec(line);
    if (regexResults !== null) {
        const linkQueueEvent: ILinkQueueEvent = JSON.parse(regexResults[1])["data"];
        const query = linkQueueEvent.query;
        let currentHistory = history.get(query);
        if (currentHistory === undefined) {
            history.set(query, { pushEvents: [], popEvents: [] });
            currentHistory = history.get(query)!;
        }
        switch (linkQueueEvent.type) {
            case 'pushEvent':
                currentHistory.pushEvents.push({...linkQueueEvent.link, queue:linkQueueEvent.queue});
                break;

            case 'popEvent':
                currentHistory.popEvents.push({...linkQueueEvent.link, queue:linkQueueEvent.queue});
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



export type HistoryByQuery = Map<string, IHistory>;

/**
 * Timeline of the link queue divided into pushed and popped
 */
export interface IHistory {
    pushEvents: object[];
    popEvents: object[];
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

