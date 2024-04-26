export const REGEX_LINK_QUEUE_EVENT = new RegExp("TRACE: <Link queue occupancy> { data: '(?<jsonEvent>.*)' }", 'gm')

export function parseLine(line: string, history: IHistory) {
    const groups = REGEX_LINK_QUEUE_EVENT.exec(line)?.groups;
    if (groups !== undefined) {
        const linkQueueEvent: ILinkQueueEvent = JSON.parse(groups['jsonEvent']);
        switch (linkQueueEvent.type) {
            case EventType[EventType.Push]:
                history.pushedEvent.push(linkQueueEvent.link);
                break;

            case EventType[EventType.Pop]:
                history.popEvent.push(linkQueueEvent.link);
                break;
        }
    }else{
        console.log("no");
    }
}

/**
 * Event type of the link queue
 */
export enum EventType {
    Push,
    Pop,
}
/**
 * Timeline of the link queue divided into pushed and popped
 */
export interface IHistory {
    pushedEvent: IURLStatistic[];
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
    query: Object;
}