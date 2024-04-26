import { parseLine, getStream, HistoryByQuery, REGEX_LINK_QUEUE_EVENT } from "./util";

export async function fromLogFile(path: string, forceNodeJs = false, regexLinkQueueEvent: RegExp = REGEX_LINK_QUEUE_EVENT): Promise<HistoryByQuery> {
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
                parseLine(currentLine, history, regexLinkQueueEvent);
            }
        }
        remainingData = lines[0];

    }
    return history;
}
const originalStdErrWrite = process.stderr.write.bind(process.stdout);
Object.freeze(originalStdErrWrite);

export function pipeFromLogger(history: HistoryByQuery, regexLinkQueueEvent: RegExp = REGEX_LINK_QUEUE_EVENT) {

    process.stderr.write = (line: string, encoding: any) => {
        parseLine(line, history, regexLinkQueueEvent);
        return originalStdErrWrite(line, encoding);
    };
}

export function revertToOriginalStdErrImplementation(): void {
    process.stderr.write = originalStdErrWrite;
}
