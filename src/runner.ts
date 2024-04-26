import { IHistory, parseLine } from "./util";
import { ReadStream, createReadStream } from "node:fs";

export async function fromLogFile(path: string, forceNodeJs: boolean = false): Promise<IHistory> {
    const decoder = new TextDecoder();
    let remainingData = "";
    const stream = await getStream(path, forceNodeJs);

    const history: IHistory = {
        pushedEvent: [],
        popEvent: []
    };

    for await (const chunk of stream) {
        const str = decoder.decode(chunk);

        remainingData += str;

        let lines = remainingData.split(/\r?\n/);

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

export async function fromLogger(history: IHistory){
    const originalStdoutWrite = process.stderr.write.bind(process.stdout);

    process.stderr.write = (line:string, encoding:any) => {
        parseLine(line, history);
        return originalStdoutWrite(line, encoding);
    };
}
