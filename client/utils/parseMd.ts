import { readFileSync } from "fs";
import showdown from "showdown";

import path from "path";
const parseMd = (fileName: string): string => {
    const mdir = path.join(process.cwd(), "data", fileName + ".md");
    const data = readFileSync(mdir, "utf-8");
    return new showdown.Converter({}).makeHtml(data);
};

export default parseMd;
