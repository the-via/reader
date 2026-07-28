import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { argv } from "process";

const searchPath = argv[2];

const replacements: [string, string][] = [
    ["import {inspect} from 'util';", "const inspect = JSON.stringify;"],
    ["import Ajv = require('ajv');", "import {Ajv, ValidateFunction} from 'ajv';"],
    ["export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>", ""],
    [
        'export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":false});',
        `
import addFormats from "ajv-formats"; 
export const ajv = new Ajv({ "allErrors": true, "coerceTypes": false, "unicode": true, "useDefaults": false });
addFormats(ajv, {mode: "fast"});
        `,
    ],
]

const files = readdirSync(searchPath);
for (const file of files) {
    const fullPath = join(searchPath, file);
    if (!file.includes(".validator.ts")) continue;
    console.log(`Fixing content in '${fullPath}'`);
    const fileContents = readFileSync(fullPath);
    let modifiedFile = fileContents.toString("utf-8");
    for (const [toReplace, replaceWith] of replacements) {
        modifiedFile = modifiedFile.replaceAll(toReplace, replaceWith);

    }
    if (
        file === "keyboard-definition-v3.validator.ts" ||
        file === "via-definition-v3.validator.ts"
    ) {
        modifiedFile = modifiedFile.replace(
            'import addFormats from "ajv-formats";',
            'import addFormats from "ajv-formats";\nimport {addKeycodeModuleExclusion} from "../validate";',
        );
        modifiedFile = modifiedFile.replace(
            /ajv\.compile\((\w+Schema)\)/,
            "ajv.compile(addKeycodeModuleExclusion($1))",
        );
    }
    writeFileSync(fullPath, modifiedFile);
}
