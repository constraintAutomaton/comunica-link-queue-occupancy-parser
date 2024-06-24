import { parseLine, HistoryByQuery } from "./util";
import { ReadStream, createReadStream } from "node:fs";
import { createInterface } from 'readline';



export async function fromLogFile(path: string, forceNodeJs = false): Promise<HistoryByQuery> {
    const stream = await createReadStream(path);

    const history: HistoryByQuery = new Map();

    const rl = createInterface({
        input: stream,
        crlfDelay: Infinity
    });
    for await (const currentLine of rl) {
        parseLine(currentLine, history);
    }
    return history;
}

export function fromString(data: string): HistoryByQuery {
    const history: HistoryByQuery = new Map();

    const dataByLine = data.split("\n");

    for (const line of dataByLine) {
        parseLine(line, history);
    }
    return history;
}


