import { parseLine, HistoryByQuery } from "./util";
import { ReadStream, createReadStream } from "node:fs";

export async function fromLogFile(path: string, forceNodeJs = false, ): Promise<HistoryByQuery> {
    const decoder = new TextDecoder();
    let remainingData = "";
    const stream = await getStream(path, forceNodeJs);

    const history: HistoryByQuery = new Map();

    for await (const chunk of stream) {
        const str = decoder.decode(chunk);

        remainingData += str;

        const lines = remainingData.split(/\r?\n/);

        while (lines.length > 1) {
            const currentLine = lines.shift();
            if (currentLine !== undefined) {
                parseLine(currentLine, history);
            }
        }
        remainingData = lines[0];

    }
    return history;
}

async function getStream(path: string, forceNodeJs: boolean = false): Promise<ReadableStream<any> | ReadStream> {
    if (Bun?.file === undefined || forceNodeJs) {
        return createReadStream(path);
    } else {
        const file = Bun.file(path);
        return await file.stream();
    }
}

const originalStdErrWrite = process.stderr.write.bind(process.stdout);
Object.freeze(originalStdErrWrite);

export function pipeFromLogger(history: HistoryByQuery) {

    process.stderr.write = (line: string, encoding: any) => {
        parseLine(line, history);
        return originalStdErrWrite(line, encoding);
    };
}

export function revertToOriginalStdErrImplementation(): void {
    process.stderr.write = originalStdErrWrite;
}
