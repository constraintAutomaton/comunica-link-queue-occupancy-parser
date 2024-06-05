import { parseLine, HistoryByQuery } from "./util";
import { ReadStream, createReadStream } from "node:fs";
import { Readable } from 'stream';

export async function fromLogFile(path: string, forceNodeJs = false): Promise<HistoryByQuery> {
    const decoder = new TextDecoder();
    let remainingData = "";
    const stream = await getStream(path, forceNodeJs);

    const history: HistoryByQuery = new Map();

    for await (const chunk of stream) {
        const str = decoder.decode(chunk);

        remainingData += str;

        const lines = remainingData.split('\n');

        while (lines.length > 0) {
            const currentLine = lines.shift();
            if (currentLine !== undefined) {
                parseLine(currentLine, history);
            }
        }
        remainingData = lines[0];

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

async function getStream(data: string, forceNodeJs: boolean = false): Promise<ReadableStream<any> | ReadStream | Readable> {
    if (Bun?.file === undefined || forceNodeJs) {
        return createReadStream(data);
    } else {
        const file = Bun.file(data);
        return await file.stream();
    }
}

