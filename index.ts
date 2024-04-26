import { fromLogFile } from "./src/runner";
const path = "./test_file";

const history = await fromLogFile(path, true);
console.log(history);